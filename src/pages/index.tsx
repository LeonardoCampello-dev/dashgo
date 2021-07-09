import { Flex, Button, Stack } from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Formato de e-mail inválido')
    .required('O campo de e-mail é obrigatório.'),
  password: yup
    .string()
    .required('O campo de senha é obrigatório')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(16, 'A senha deve ter no máximo 16 caracteres')
});

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (
    payload
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Flex
      width='100vw'
      height='100vh'
      align='center'
      justify='center'
    >
      <Flex
        as='form'
        width='100%'
        maxWidth={360}
        padding={8}
        bg='gray.800'
        borderRadius={8}
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            name='email'
            type='email'
            label='E-mail'
            {...register('email')}
            error={formState.errors.email}
          />

          <Input
            name='password'
            type='password'
            label='Senha'
            {...register('password')}
            error={formState.errors.password}
          />
        </Stack>

        <Button
          type='submit'
          mt={6}
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
