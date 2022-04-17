import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200).json([]);
  }

  if (req.method === "GET") {
    try {
      const homesLikedByUser = await prisma.home.findMany({
        where: {
          likedBy: {
            some: {
              user: {
                id: session.user.id,
              },
            },
          },
        },
      });
      res.status(200).json(homesLikedByUser);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
