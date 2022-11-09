import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/img/logo.svg";

const Logo: NextPage = () => {
  return (
    <>
      <Link href="/">
        <Image src={logo} width={80} height={80} className="cursor-pointer" />
      </Link>
    </>
  );
};

export default Logo;
