import { forwardRef, ForwardRefRenderFunction } from "react";

import {
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    { name, label, error = null, ...props },
    ref
) => {
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
                name={name}
                id={name}
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{
                    bgColor: "gray.900",
                }}
                size="lg"
                ref={ref}
                {...props}
            />
            {!!error && (
                <FormErrorMessage>{String(error.message)}</FormErrorMessage>
            )}
        </FormControl>
    );
};

export const Input = forwardRef(InputBase);
