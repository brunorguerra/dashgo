import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    VStack,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type SignInFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const signInFormSchema = yup.object().shape({
    name: yup.string().required("Digite seu nome"),
    email: yup.string().required("Digite seu e-mail").email("E-mail inválido"),
    password: yup
        .string()
        .required("Digite sua senha")
        .min(6, "Mínimo de 6 caracteres"),
    password_confirmation: yup
        .string()
        .oneOf([null, yup.ref("password")], "Senhas não coincidem"),
});

const CreateUser = () => {
    const router = useRouter();

    const createUser = useMutation(
        async (user: SignInFormData) => {
            const response = await api.post("users", {
                user: {
                    ...user,
                    created_at: new Date(),
                },
            });

            return response.data.user;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("users");
            },
        }
    );

    const { register, handleSubmit, formState } = useForm<SignInFormData>({
        resolver: yupResolver(signInFormSchema),
    });

    const handleCreateUser: SubmitHandler<SignInFormData> = async (data) => {
        await createUser.mutateAsync(data);

        router.push("/users");
    };

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="lg" fontWeight="normal">
                        Criar usuário
                    </Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid
                            minChildWidth="240px"
                            spacing={["6", "8"]}
                            w="100%"
                        >
                            <Input
                                label="Nome Completo"
                                error={formState.errors.name}
                                {...register("name")}
                            />
                            <Input
                                type="email"
                                label="E-mail"
                                error={formState.errors.email}
                                {...register("email")}
                            />
                        </SimpleGrid>

                        <SimpleGrid
                            minChildWidth="240px"
                            spacing={["6", "8"]}
                            w="100%"
                        >
                            <Input
                                type="password"
                                label="Senha"
                                error={formState.errors.password}
                                {...register("password")}
                            />
                            <Input
                                type="password"
                                label="Confirmação da senha"
                                error={formState.errors.password_confirmation}
                                {...register("password_confirmation")}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                colorScheme="pink"
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
};

export default CreateUser;
