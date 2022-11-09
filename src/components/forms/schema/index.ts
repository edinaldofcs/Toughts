import * as yup from "yup";

const passwordType = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const join = yup.object().shape({
  email: yup.string().email("Email inválido").required("Requerido"),
  password: yup
    .string()
    .min(6)
    .matches(passwordType, {
      message: "Por favor, insira uma senha mais forte",
    })
    .required("Senha inválida"),
});

export const register = yup.object().shape({
  email2: yup.string().email("Email inválido").required("Requerido"),
  name: yup
    .string()
    .min(6)
    .matches(/^[A-Za-z ]*$/, {
      message: "Mínimo 6 caractéres",
    })
    .required("Requerido"),
  password2: yup
    .string()
    .min(6)
    .matches(passwordType, {
      message: "Mínimo 6 digitos",
    })
    .required("Senha inválida"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password2"), null])
    .required("Preencha este campo"),
});
