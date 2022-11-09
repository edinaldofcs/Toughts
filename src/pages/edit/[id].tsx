import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "../../components/input";
import { useUserContext } from "../../context/useContext";
import { ToughtPROPS } from "../../interfaces";

export async function getServerSideProps(context: any) {
  const { title, id } = context.query;

  const update: ToughtPROPS = { title, id, createdAt: new Date() };
  return { props: { update } };
}

const Create: NextPage<{ update: ToughtPROPS }> = ({ update }) => {
  const [inputValue, setInputValue] = useState(update.title);
  const { user } = useUserContext();
  const router = useRouter();
  
  async function updateTought(e:FormEvent) {
    e.preventDefault()

    const object = {
      title: inputValue,
      id: update.id
    }

    const requestInfo = {
      method: "PATCH",
      body: JSON.stringify(object),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user.acess_token,
      }),
    };
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tought/update`,
      requestInfo
    );
    const toughUpdate = await data.json();

    if(toughUpdate){
      router.push("/dashboard")
    }

    return
    
  }

  return (
    <div className="w-full flex flex-col py-4 px-12 gap-4">
      <Link href="/dashboard">Voltar</Link>
      <h1 className="border-l-4 px-1 border-amber-600 text-lg ">
        Criando pensamento
      </h1>
      <form onSubmit={(e)=>updateTought(e)} className="flex gap-4 flex-col">
        <label htmlFor="search2" className="cursor-pointer">
          Pensamento:
        </label>
        <input
          type="text"
          name="search2"
          id="search2"
          placeholder="Está buscando por algo?"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className="h-8 bg-transparent border-2 border-amber-700 rounded outline-none pl-2"
        />
        <button
          type="submit"
          className=" w-fit text-amber-600 border-2 border-amber-600 px-4 py-1 rounded cursor-pointer transition-all duration-300 hover:border-transparent hover:bg-amber-600 hover:text-white"
        >
          Atualizar pensamento
        </button>
      </form>
    </div>
  );
};

export default Create;
