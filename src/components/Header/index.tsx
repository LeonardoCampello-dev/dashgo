import {
  Flex,
  useBreakpointValue,
  IconButton,
  Icon
} from '@chakra-ui/react';

import { Profile } from './Profile';
import { NotificationsNav } from './NotificationsNav';
import { SearchBox } from './SearchBox';
import { Logo } from './Logo';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { RiMenuLine } from 'react-icons/ri';

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      as='header'
      width='100%'
      maxWidth={1480}
      height='20'
      mx='auto'
      mt={4}
      px={6}
      align='center'
    >
      {!isWideVersion && (
        <IconButton
          aria-label='Open navigation'
          variant='unstyled'
          icon={
            <Icon
              as={RiMenuLine}
              mr='2'
              fontSize='24'
              onClick={onOpen}
            />
          }
        />
      )}

      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align='center' ml='auto'>
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
