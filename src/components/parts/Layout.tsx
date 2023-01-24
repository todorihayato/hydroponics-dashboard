import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { LayoutHeader, LayoutSidebar } from '../elements'

export const Layout = () => {
  return (
    <Box>
      <LayoutSidebar />
      <Box>
        <LayoutHeader />
        <Outlet />
      </Box>
    </Box>
  )
}
