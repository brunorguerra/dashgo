import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export const Profile = ({ showProfileData = true }: ProfileProps) => {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Bruno Guerra</Text>
                    <Text color="gray.300" fontSize="small">
                        brunoguerracontact@gmail.com
                    </Text>
                </Box>
            )}

            <Avatar
                size="md"
                name="Bruno Guerra"
                src="https://github.com/brunorguerra.png"
            />
        </Flex>
    );
};
