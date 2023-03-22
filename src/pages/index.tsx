import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {Input, TextField, Typography, Box, FormLabel, FormControl, Button} from '@mui/material';

type UserMessageType = {
  nome: string;
  email: string;
  mensagem: string;
};

const userMessageSchema = Yup.object().shape({
  nome: Yup.string().required("O campo nome é obrigatório"),
  email: Yup.string()
    .email("Digite um email valido")
    .required("O campo email é obrigatorio"),
  mensagem: Yup.string().required("O campo mensagem é obrigatorio"),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserMessageType>({
    resolver: yupResolver(userMessageSchema),
  });

  const createMessageRequest: SubmitHandler<UserMessageType> = async (
    values, e
  ) => {
    alert("Mensagem enviada com sucesso!");
    console.log(values);
    e?.target.reset();
    // await fetch("jasodajsdlk");
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  }

  return (
    <>
      <Box
      sx={style}
      >
        <Typography sx={{fontSize: '2.5rem', padding: '1rem'}}>Meu Formulario</Typography>

        <form onSubmit={handleSubmit(createMessageRequest)}>
        <FormLabel component="legend">Nome: </FormLabel>
          <TextField
            type="text"
            placeholder="Digite um nome"
            {...register("nome")}
          />
          <Typography>{errors.nome && errors.nome.message}</Typography>
          <br />

          <FormLabel component="legend">Email: </FormLabel>
          <TextField
            type="text"
            placeholder="Digite um email"
            {...register("email")}
          />
          <Typography>{errors.email && errors.email.message}</Typography>
          <br />

          <FormLabel component="legend">Mensagem: </FormLabel>
          <TextField
            type="text"
            placeholder="Digite uma mensagem"
            {...register("mensagem")}
          />
          <Typography>{errors.mensagem && errors.mensagem.message}</Typography>
          <br />

          <Button variant="contained" type="submit">Enviar</Button>
        </form>
      </Box>
    </>
  );
}