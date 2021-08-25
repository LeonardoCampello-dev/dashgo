import { useState } from 'react';

import NextLink from 'next/link';

import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Text,
  useBreakpointValue,
  Spinner,
  Link
} from '@chakra-ui/react';

import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';

import { User } from '../../services/mirage';
import { useUsers } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useUsers(page);

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10 // 10 minutes
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex width={'100%'} my='6' maxWidth={1480} mx='auto' px={'6'}>
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p={'8'}>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Usuários
              {!isLoading && isFetching && (
                <Spinner size='sm' color='gray.500' marginLeft='4' />
              )}
            </Heading>

            <NextLink href='/users/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='small'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
              >
                Cria novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify='center'>
              <Spinner color='pink.500' size='xl' />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text
                fontSize='xl'
                backgroundColor='red.500'
                px='4'
                py='2'
                borderRadius='8'
              >
                Ocorreu um erro ao buscar a lista de usuários. 🙁
              </Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th
                      px={['4', '4', '6']}
                      color='gray.300'
                      width='8'
                    >
                      <Checkbox colorScheme='pink' />
                    </Th>

                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width='8'></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user: User) => {
                    const { id, name, email, created_at } = user;

                    return (
                      <Tr key={id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme='pink' />
                        </Td>

                        <Td>
                          <Box>
                            <Link
                              color='purple.400'
                              onMouseEnter={() =>
                                handlePrefetchUser(user.id)
                              }
                            >
                              <Text fontWeight='bold'>{name}</Text>
                            </Link>

                            <Text fontSize='sm' color='gray.300'>
                              {email}
                            </Text>
                          </Box>
                        </Td>

                        {isWideVersion && <Td>{created_at}</Td>}

                        {isWideVersion && (
                          <Td>
                            <Button
                              as='a'
                              size='sm'
                              fontSize='small'
                              colorScheme='purple'
                              leftIcon={
                                <Icon
                                  as={RiPencilLine}
                                  fontSize='16'
                                />
                              }
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
