import type { NextPage } from "next";
import { useState } from "react";
import Input from "../components/input";
import { useUserContext } from "../context/useContext";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { ToughtPROPS } from "../interfaces";

export async function getServerSideProps(context: any) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tought/all`);
  const toughts = await data.json();

  return { props: { toughts } };
}



const Home: NextPage<{ toughts: ToughtPROPS[] }> = ({ toughts }) => {
  const { user } = useUserContext();
  const [AllToughts, setAllToughts] = useState<ToughtPROPS[]>(toughts)
  const [search, setSearch] = useState("");

  async function listByOlders(){
    console.log(AllToughts);
    
    const newList = AllToughts.sort((a,b)=>{  


      return Number(a.createdAt) -  Number(b.createdAt)
        
    })
    setAllToughts(newList)
    console.log(newList);
    
  }
  return (
    <div className="flex flex-col w-max-[80%] items-center text-center py-4 gap-4">
      <h1 className="text-xl font-semibold">Todos os pensamentos</h1>
      <form action="/" method="get" className="flex gap-4">
        <Input
          type="text"
          name="search"
          placeholder="Está buscando por algo?"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <input
          type="submit"
          className="text-amber-600 border-2 border-amber-600 px-2 py-1 rounded cursor-pointer transition-all duration-300 hover:border-transparent hover:bg-amber-600 hover:text-white"
          value="Buscar"
        />
      </form>
      <div className="flex gap-4">
        <p>Ordenar por:</p>
        <button>
          <BsArrowUp />
        </button>
        <button>
          <BsArrowDown onClick={listByOlders}/>
        </button>
        <button>Limpar</button>
      </div>
      <div className="w-3/6 flex flex-col items-start gap-2 ">
        {AllToughts.map((tought: ToughtPROPS) => (
          <div key={tought.id} className="flex flex-col gap-1 border-b-[1px] w-full text-left px-2 py-1 border-b-[#333] shadow-md">
            <p className="text-xl">
              <span>&quot;</span> {tought.title} <span>&quot;</span>
            </p>
            <p>
              <span className="mr-2">por:</span>
              <span className="text-sm text-amber-600"> {tought.author}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
