import type { NextPage } from "next";
import { useFormik } from "formik";
import { register } from "../../components/forms/schema";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

interface InitialValuesProps {
  email2: string;
  name: string;
  password2: string;
  confirmpassword: string;
}

const Register: NextPage = () => {
  const router = useRouter();

  const onSubmit = async (values: any, actions: any) => {
    delete values.confirmpassword;

    const infos = {
      name: values.name,
      email: values.email2,
      password: values.password2,
    };

    const requestInfo = {
      method: "POST",
      body: JSON.stringify(infos),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
      requestInfo
    );

    if (data.status === 201) {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
    // actions.resetForm();
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
      email2: "",
      password2: "",
      confirmpassword: "",
      name: "",
    },
    validationSchema: register,
    onSubmit,
  });

  return (
    <div className="mt-4 flex items-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col px-2 w-[90%] max-w-[500px]"
      >
        <div className="flex flex-col">
        <h2 className="border-l-4 px-1 mb-2 border-amber-600">Cadastrar</h2>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email2"
            value={values.email2}
            onChange={handleChange}
            placeholder="Digite o seu email"
            onBlur={handleBlur}
            className={`h-8 bg-transparent border-2 border-amber-700 rounded outline-none pl-2 ${
              errors.email2 && touched.email2 && "border-amber-600 border"
            }`}
          />
          <span
            className={`h-6 ${
              errors.email2 && touched.email2 && "text-amber-600"
            }`}
          >
            {errors.email2 && touched.email2 && "Email inválido"}
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Nome</label>
          <input
            type="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Digite o seu nome"
            onBlur={handleBlur}
            className={`h-8 bg-transparent border-2 border-amber-700 rounded outline-none pl-2 ${
              errors.name && touched.name && "border-amber-600 border"
            }`}
          />
          <span
            className={`h-6 ${errors.name && touched.name && "text-amber-600"}`}
          >
            {errors.name && touched.name && "minimo 6 caractéres"}
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password2">Senha</label>
          <input
            type="password"
            id="password2"
            value={values.password2}
            onChange={handleChange}
            placeholder="Ex: X@xx11"
            onBlur={handleBlur}
            className={`h-8 bg-transparent border-2 border-amber-700 rounded outline-none pl-2 ${
              errors.password2 && touched.password2 && "border-amber-600 border"
            }`}
          />
          <span
            className={`h-6 ${
              errors.password2 && touched.password2 && "text-amber-600"
            }`}
          >
            {errors.password2 && touched.password2 && "Senha inválida"}
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmpassword">Confirmação de senha</label>
          <input
            type="password"
            id="confirmpassword"
            value={values.confirmpassword}
            onChange={handleChange}
            placeholder="Repita a sua senha"
            onBlur={handleBlur}
            className={`h-10 bg-transparent border-2 border-amber-700 rounded outline-none pl-2 ${
              errors.confirmpassword &&
              touched.confirmpassword &&
              "border-amber-600 border"
            }`}
          />
          <span
            className={`h-6 ${
              errors.confirmpassword &&
              touched.confirmpassword &&
              "text-amber-600"
            }`}
          >
            {errors.confirmpassword &&
              touched.confirmpassword &&
              "As senhas não conferem"}
          </span>
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className=" w-fit text-amber-600 border-2 border-amber-600 px-4 py-1 rounded cursor-pointer transition-all duration-300 hover:border-transparent hover:bg-amber-600 hover:text-white"
        >
          Cadastrar
        </button>
        <div className="mt-2">
          <span>Já tem uma conta </span>
          <Link href="/login">
            <span className="text-amber-600 cursor-pointer hover:brightness-110">Clique aqui</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
