import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"
type Props = {
  children: ReactNode
}

export const PagesContainer = (props: Props) => {
  return (
    <Box left={"240px"} top={"72px"} position={"fixed"}>
      {props.children}
    </Box>
  )
}