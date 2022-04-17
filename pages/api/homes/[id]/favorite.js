import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  // TODO: Check if user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const { id } = req.query;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { favouriteHomes: true },
  });

  // TODO: Add home to favorite
  if (req.method === "PUT") {
    try {
      console.log("creating");
      await prisma.homesLikedByUsers.create({
        data: {
          homeId: id,
          userId: user.id,
        },
      });
      res.status(200).json({ message: "Ok" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Failed to update user favorites" });
    }
  } else if (req.method === "DELETE") {
    try {
      console.log("deleting");
      await prisma.homesLikedByUsers.deleteMany({
        where: { homeId: id, userId: user.id },
      });
      res.status(200).json({ message: "Ok" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Failed to update user favorites" });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
