import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "../../components/input";
import { useUserContext } from "../../context/useContext";

const Create: NextPage = () => {
  const { user } = useUserContext();
  const [search, setSearch] = useState("")
  const router = useRouter();

  async function handleSubmit(e:FormEvent){
    e.preventDefault()
    
    const title = {
      title: search
    }

    const requestInfo = {
      method: "POST",
      body: JSON.stringify(title),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user.acess_token,
      }),
    };
    
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tought/create`,
      requestInfo
    );
    const toughUpdate = await data.json();

    if(toughUpdate){
      router.push("/")
    }

    return
  }

  return (
    <div className="w-full flex flex-col py-4 px-12 gap-4">
      <a href="/dashboard">Voltar</a>
      <h1 className="border-l-4 px-1 border-amber-600 text-lg ">Criando pensamento</h1>
      <form onSubmit={(e)=>handleSubmit(e)} className="flex gap-4 flex-col">
        <label htmlFor="search2" className="cursor-pointer">Pensamento:</label>
        <input
          type="text"
          name="search2"
          id="search2"
          placeholder="Está buscando por algo?"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="h-8 bg-transparent border-2 border-amber-700 rounded outline-none pl-2"
        />
        <button
          type="submit"
          className=" w-fit text-amber-600 border-2 border-amber-600 px-4 py-1 rounded cursor-pointer transition-all duration-300 hover:border-transparent hover:bg-amber-600 hover:text-white"
        >
          Criar pensamento
        </button>
      </form>
    </div>
  );
};

export default Create;

