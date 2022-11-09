import type { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <footer className="w-full py-4 flex justify-center items-center border-t-2 border-t-amber-700 fixed bottom-0 text-amber-700  py-4">
      Toughts -<span className="text-white"> - &copy; 2022</span>
    </footer>
  );
};

export default Footer;
