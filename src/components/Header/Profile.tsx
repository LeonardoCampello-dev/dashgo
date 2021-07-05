import { Flex, Box, Avatar, Text } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align='center'>
      <Box mr='4' textAlign='right'>
        <Text>Leonardo Campello</Text>
        <Text color='gray.300' fontSize='small'>
          leonardocampello.dev@gmail.com
        </Text>
      </Box>

      <Avatar size='md' name='Leonardo Campello' />
    </Flex>
  );
}
