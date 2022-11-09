import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "../../context/useContext";

import logo from "../../public/img/logo.png";

interface LIPROPS {
  link: string;
  text: string;
  handleClick?: () => void;
}

const LI = ({ link, text, handleClick }: LIPROPS) => {
  return (
    <li
      onClick={handleClick}
      className="transition-all duration-200 hover:text-amber-700"
    >
      <Link href={link}>{text}</Link>
    </li>
  );
};

const Header: NextPage = () => {
  const { user } = useUserContext();

  function handleLeave() {
    localStorage.removeItem("toughts");
    window.location.reload();
  }

  return (
    <nav className="px-8 py-2 flex justify-between items-center border-b-2 border-b-amber-700">
      <div className="cursor-pointer">
        <Link href="/">
          <Image src={logo} alt="toughts" width={40} height={40} />
        </Link>
      </div>

      <ul className="flex gap-6 ">
        <LI link="/" text="Pensamentos" />
        {user.acess_token ? (
          <>
            <LI link="/dashboard" text="Dashboard" />
            <LI link="/logout" text="Sair" handleClick={handleLeave} />
          </>
        ) : (
          <>
            <LI link="/login" text="Entrar" />
            <LI link="/cadastrar" text="Criar conta" />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
