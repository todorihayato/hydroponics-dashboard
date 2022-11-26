---
to: src/components/<%= path %>/<%= name %>.tsx
---
import { Box } from '@chakra-ui/react'
<% if(withProps) { -%>
type Props = {}
<%} -%>

export const <%= name %> = (<% if(withProps) { -%> props: Props <%} -%>) => {
  return (
    <Box>
      <%= name %>
    </Box>
  )
}