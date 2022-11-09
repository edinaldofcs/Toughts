import type { NextPage } from "next";
import { useFormik } from "formik";
import { join } from "../../components/forms/schema";
import { useUserContext } from "../../context/useContext";
import { useRouter } from "next/router";
import Link from "next/link";

interface InitialValuesProps {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const { updateUser, user } = useUserContext();
  const router = useRouter();

  const onSubmit = async (values: any, actions: any) => {  
    
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(values),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, requestInfo);
 
    const newUser = await data.json();
    updateUser(newUser);
    localStorage.setItem(`toughts`, JSON.stringify(newUser))
    router.push("/")
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useFormik<InitialValuesProps>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: join,
    onSubmit,
  });

  return (
    <div className="mt-4 flex items-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col p-2 w-[90%] max-w-[500px]"
      >
        <div className="flex flex-col gap-4">
        <h2 className="border-l-4 px-1 border-amber-600">Login</h2>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Digite o seu email"
            onBlur={handleBlur}
            className={`h-10 bg-transparent border-2 border-amber-700 rounded outline-none pl-2 ${
              errors.email && touched.email && "border-amber-600 border"
            }`}
          />
          <span
            className={`h-8 ${errors.email && touched.email && "text-amber-600"}`}
          >
            {errors.email && touched.email && "Email inválido"}
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Ex: X@xx11"
            onBlur={handleBlur}
            className={`h-10 bg-transparent border-2 border-amber-700 rounded outline-none pl-2 ${
              errors.password && touched.password && "border-amber-600 border"
            }`}
          />
          <span
            className={`h-8 ${
              errors.password && touched.password && "text-amber-600"
            }`}
          >
            {errors.password && touched.password && "Senha inválida"}
          </span>
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className=" w-fit text-amber-600 border-2 border-amber-600 px-4 py-1 rounded cursor-pointer transition-all duration-300 hover:border-transparent hover:bg-amber-600 hover:text-white"
        >
          Entrar
        </button>
        <div className="mt-2">
          <span>Não tem uma conta? </span>
          <Link href="/cadastrar">
            <span className="text-amber-600 cursor-pointer hover:brightness-110">Crie a sua</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
