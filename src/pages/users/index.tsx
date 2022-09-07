import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Icon,
    Link,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

import NextLink from "next/link";
import { User, useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

const UsersList = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error } = useUsers(page);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(["user", userId], async () => {
            const response = await api.get(`users/${userId}`);
            return response.data;
        });
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p="8"
                    overflow="hidden"
                >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            {!isLoading && isFetching && (
                                <Spinner size="sm" color="gray.500" ml="4" />
                            )}
                        </Heading>

                        <NextLink href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                {isWideVersion
                                    ? "Criar novo usuário"
                                    : "Criar novo"}
                            </Button>
                        </NextLink>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários.</Text>
                        </Flex>
                    ) : (
                        <Box overflow="auto" w="100%">
                            <Table colorScheme="whiteAlpha" minW={600}>
                                <Thead>
                                    <Tr>
                                        <Th
                                            px={["4", "4", "6"]}
                                            color="gray.300"
                                            w="8"
                                        >
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuário</Th>
                                        <Th>Data de cadastro</Th>
                                        <Th w="8"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data?.users.map((user: User) => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={["4", "4", "6"]}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link
                                                            color="purple.400"
                                                            onMouseEnter={() =>
                                                                handlePrefetchUser(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            <Text fontWeight="bold">
                                                                {user.name}
                                                            </Text>
                                                        </Link>
                                                        <Text
                                                            fontSize="sm"
                                                            color="gray.300"
                                                        >
                                                            {user.email}
                                                        </Text>
                                                    </Box>
                                                </Td>
                                                <Td>{user.createdAt}</Td>
                                                <Td>
                                                    <Button
                                                        as="a"
                                                        size="sm"
                                                        fontSize="sm"
                                                        colorScheme="purple"
                                                        leftIcon={
                                                            <Icon
                                                                as={
                                                                    RiPencilLine
                                                                }
                                                                fontSize="20"
                                                            />
                                                        }
                                                    >
                                                        Editar
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                            <Pagination
                                totalCountOfRegisters={data?.totalCount || 0}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </Box>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default UsersList;
