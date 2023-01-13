---
to: src/components/<%= path %>/<%= name %>.tsx
---
import { Box } from '@chakra-ui/react'
<% if(have_props) { -%>
type Props = {}
<%} -%>

export const <%= name %> = (<% if(have_props) { -%> props: Props <%} -%>) => {
  return (
    <Box>
      <%= name %>
    </Box>
  )
}