import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { LayoutSidebar } from '../elements'

export const Layout = () => {
  return (
    <Box>
      <LayoutSidebar/>
      <Outlet/>
    </Box>
  )
}