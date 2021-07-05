import dynamic from 'next/dynamic';

import { Flex, SimpleGrid, Box, Text } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

import {
  options,
  series
} from '../utils/charts/dashboardChartConfig';

export default function Dashboard() {
  return (
    <Flex direction='column' height='100vh'>
      <Header />

      <Flex width='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <Sidebar />

        <SimpleGrid
          flex='1'
          gap='4'
          minChildWidth='320px'
          align='flex-start'
        >
          <Box p='8' bg='gray.800' borderRadius={8} pb='4'>
            <Text fontSize='lg' mb='4'>
              Inscritos da semana
            </Text>
            <Chart
              options={options}
              series={series}
              type='area'
              height={160}
            />
          </Box>

          <Box p='8' bg='gray.800' borderRadius={8} pb='4'>
            <Text fontSize='lg' mb='4'>
              Taxa de abertura
            </Text>

            <Chart
              options={options}
              series={series}
              type='area'
              height={160}
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
