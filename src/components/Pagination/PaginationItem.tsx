import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  number: number;
  isCurrentPage?: boolean;
}

export function PaginationItem({
  number,
  isCurrentPage = false
}: PaginationItemProps) {
  if (isCurrentPage) {
    return (
      <Button
        size='sm'
        fontSize='xs'
        width='4'
        colorScheme='pink'
        disabled
        _disabled={{ bg: 'pink.500', cursor: 'default' }}
      >
        {number}
      </Button>
    );
  } else {
    return (
      <Button
        size='sm'
        fontSize='xs'
        width='4'
        bg='gray.700'
        _hover={{ bg: 'pink.500' }}
      >
        {number}
      </Button>
    );
  }
}
