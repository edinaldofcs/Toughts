import type { NextPage } from "next";

interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  name?:string;
  id?:string;
  onChange: (e: any) => void;
}

const Input: NextPage<InputProps> = ({
  type,
  placeholder,
  value,
  id,
  onChange,
  ...res
}) => {
  return (
    <input
      {...res}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-8 bg-transparent border-b-2 border-b-amber-4 00 outline-none"
    />
  );
};

export default Input;
