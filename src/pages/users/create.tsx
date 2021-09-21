import Link from 'next/link';
import { useRouter } from 'next/router';

import { useMutation } from 'react-query';

import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button
} from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Form/Input';

import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('O campo de nome é obrigatório').trim(),
  email: yup
    .string()
    .email('Formato de e-mail inválido')
    .required('O campo de e-mail é obrigatório.'),
  password: yup
    .string()
    .required('O campo de senha é obrigatório')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(16, 'A senha deve ter no máximo 16 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf(
      [null, yup.ref('password')],
      'As senhas precisam ser idênticas'
    )
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date()
        }
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      }
    }
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);

    router.push('/users');
  };

  return (
    <Box>
      <Header />

      <Flex width='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <Sidebar />

        <Box
          as='form'
          flex='1'
          borderRadius={8}
          bg='gray.800'
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size='lg' fontWeight='normal'>
            Criar Usuário
          </Heading>

          <Divider my='6' borderColor='gray.700' />

          <VStack spacing='8'>
            <SimpleGrid
              minChildWidth='240px'
              spacing={['6', '8']}
              width='100%'
            >
              <Input
                name='name'
                label='Nome completo'
                {...register('name')}
                error={formState.errors.name}
              />
              <Input
                name='email'
                label='E-mail'
                type='email'
                {...register('email')}
                error={formState.errors.email}
              />
            </SimpleGrid>

            <SimpleGrid
              minChildWidth='240px'
              spacing={['6', '8']}
              width='100%'
            >
              <Input
                name='password'
                label='Senha'
                type='password'
                {...register('password')}
                error={formState.errors.password}
              />
              <Input
                name='password_confirmation'
                label='Confirmação da senha'
                type='password'
                {...register('password_confirmation')}
                error={formState.errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href='/users' passHref>
                <Button colorScheme='whiteAlpha'>Cancelar</Button>
              </Link>
              <Button
                type='submit'
                colorScheme='pink'
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
