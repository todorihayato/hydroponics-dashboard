import { Box, Text } from '@chakra-ui/react'

export const LayoutSidebar = () => {
  return (
    <Box h={'100vh'} w={"240px"} shadow={'lg'} position={"fixed"} >
      <Text w={'100%'} textAlign={'center'} pt={4} fontWeight={'800'} fontSize={'xl'}>IoT Hydroponics</Text>
    </Box>
  )
}