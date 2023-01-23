import { Box, Text } from '@chakra-ui/react'

export const LayoutSidebar = () => {
  return (
    <Box h={'100vh'} w={'200px'} bg={'gray.100'}>
      <Text w={'100%'} textAlign={'center'} pt={4} fontWeight={'800'}>IoT Hydroponics</Text>
    </Box>
  )
}