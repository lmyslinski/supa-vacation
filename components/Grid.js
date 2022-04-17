import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@/components/Card";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

const Grid = ({ homes = [] }) => {
  const [favorites, setFavorites] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      if (session?.user) {
        try {
          const { data: homes } = await axios.get(`/api/user/favorite`);
          setFavorites(homes);
        } catch (e) {
          console.log(e);
          setFavorites([]);
        }
      }
    })();
  }, [session?.user]);

  const isEmpty = homes.length === 0;

  const isFavorite = (id) =>
    favorites.find((home) => home.id === id) !== undefined;

  const toggleFavorite = async (id) => {
    if (isFavorite(id)) {
      await axios.delete(`/api/homes/${id}/favorite`);
    } else {
      await axios.put(`/api/homes/${id}/favorite`);
    }
    const { data: homes } = await axios.get(`/api/user/favorite`);
    console.log(homes);
    setFavorites(homes);
  };

  return isEmpty ? (
    <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
      <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {homes.map((home) => (
        <Card
          key={home.id}
          {...home}
          onClickFavorite={toggleFavorite}
          favorite={isFavorite(home.id)}
        />
      ))}
    </div>
  );
};

export default Grid;
