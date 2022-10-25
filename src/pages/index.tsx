import { Flex, Button, Stack } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";
import { useRouter } from "next/router";

type SignInFormData = {
    email: string;
    password: string;
};

const signInFormSchema = yup.object().shape({
    email: yup.string().required("Digite seu e-mail").email("E-mail inválido"),
    password: yup.string().required("Digite sua senha"),
});

const SignIn = () => {
    const { register, handleSubmit, formState } = useForm<SignInFormData>({
        resolver: yupResolver(signInFormSchema),
    });
    const router = useRouter();

    const handleSign: SubmitHandler<SignInFormData> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        router.push("/dashboard");
        console.log(data);
    };

    return (
        <Flex w="100vw" h="100vh" align="center" justify="center">
            <Flex
                as="form"
                width="100%"
                maxWidth={360}
                bg="gray.800"
                p="8"
                borderRadius={8}
                flexDir="column"
                onSubmit={handleSubmit(handleSign)}
            >
                <Stack spacing="4">
                    <Input
                        label="E-mail"
                        type="email"
                        error={formState.errors.email}
                        {...register("email")}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        error={formState.errors.password}
                        {...register("password")}
                    />
                </Stack>

                <Button
                    type="submit"
                    mt="6"
                    colorScheme="pink"
                    size="lg"
                    isLoading={formState.isSubmitting}
                >
                    Entrar
                </Button>
            </Flex>
        </Flex>
    );
};

export default SignIn;
