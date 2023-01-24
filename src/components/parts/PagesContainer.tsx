import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"
type Props = {
  children: ReactNode
}

export const PagesContainer = (props: Props) => {
  return (
    <Box left={"240px"} top={"72px"} position={"fixed"} w={'calc(100vw - 240px)'} h={'calc(100vh - 72px)'} bg={'gray.50'}>
      {props.children}
    </Box>
  )
}