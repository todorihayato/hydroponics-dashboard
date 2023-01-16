import { Box, Text } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <Box>
      <Text>
        Layout
      </Text>
      <Outlet/>
    </Box>
  )
}