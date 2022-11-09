import { createContext, useEffect, useState } from "react";

export type User = {
  acess_token: string | null;
  userName: string | null;
  toughts?: {
    title: string
  }[];
};

interface IContext {
  user: User;
  updateUser: (user: User) => void;
}

export const Context = createContext<IContext | null>(null);

export const Provider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    acess_token: null,
    userName: null,
  });
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const myUser = localStorage.getItem("toughts");
    if (myUser) {      
      updateUser(JSON.parse(myUser));
    }
  }, []);
  
  const updateUser = (user: User) => {
    setUser(user);
  };

  return (
    <Context.Provider value={{ user, updateUser }}>{children}</Context.Provider>
  );
};
