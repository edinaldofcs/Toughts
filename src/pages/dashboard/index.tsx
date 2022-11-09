import type { NextPage } from "next";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useUserContext } from "../../context/useContext";
import { ToughtPROPS } from "../../interfaces";

const Dashboard: NextPage = () => {
  const { user } = useUserContext();
  const [toughts, setToughts] = useState<ToughtPROPS[]>([]);
  const [notEmpty, setNotEmpty] = useState(false);

  useEffect(() => {
    const myToughts = async () => {
      const requestInfo = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + user.acess_token,
        }),
      };
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tought/mytoughts`,
        requestInfo
      );
      const toughtList = await data.json();

      if (toughtList.length > 0) {
        setNotEmpty(true);
        setToughts(toughtList);
      }
    };

    myToughts();
  }, [user]);

  async function handleDelete(e: FormEvent, id: string) {
    e.preventDefault();

    const requestInfo = {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user.acess_token,
      }),
    };
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tought/delete/${id}`,
      requestInfo
    );
    const toughUpdate = await data.json();

    if (toughUpdate) {
      window.location.reload();
    }

    return;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-10 py-4 justify-between flex ">
        <h2 className="border-l-4 px-1 border-amber-600 text-lg ">Dashboard</h2>
        <div className=" w-fit text-amber-600 border-2 border-amber-600 px-4 py-1 rounded cursor-pointer transition-all duration-300 hover:border-transparent hover:bg-amber-600 hover:text-white">
          <Link href="/create">Criar Pensamentos</Link>
        </div>
      </div>
      {notEmpty ? (
        <>
          <h2 className="px-10">Seus pensamentos</h2>

          <ul className="mt-4 flex flex-col w-full items-center">
            {toughts.map((tought) => (
              <li key={tought.id} className="flex w-[90%] pl-8 pr-4 py-2 justify-between border-b border-amber-500 shadow-lg">
                <span className="text-amber-600">{tought.title}</span>
                <span className="flex gap-2">
                  <div className=" w-fit text-amber-600 border-2 border-amber-600 px-4 py-1 rounded cursor-pointer transition-all duration-300 hover:border-transparent hover:bg-amber-600 hover:text-white">
                    <Link href={`/edit/${tought.id}?title=${tought.title}`}>
                      Editar
                    </Link>
                  </div>
                  <form onSubmit={(e) => handleDelete(e, tought.id)}>
                    <button
                      type="submit"
                      className=" w-fit text-amber-600 border-2 border-amber-600 px-4 py-1 rounded cursor-pointer transition-all duration-300 hover:border-transparent hover:bg-amber-600 hover:text-white"
                    >
                      Excluir
                    </button>
                  </form>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="p-6">
          <span>Seus pensamentos estão vazios : </span>
          <span className="text-amber-600 cursor-pointer hover:brightness-110">
            <Link href="/create">Que tal criar um agora?</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
