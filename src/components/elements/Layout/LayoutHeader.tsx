import { Box, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

export const LayoutHeader = () => {
  const path = useLocation().pathname
  const convertPath = (path: string) => {
    switch (path){
      case "/":
        return "Dashboard"
      case "/ec":
        return "EC"
      case "/co2":
        return "CO2"
      case "/humidity":
        return "Humidity"
      case "/temperature":
        return "Temperature"
      case "/water_temperature":
        return "Water Temperature"
      default:
        return "ERROR"
    }
  }
  return (
    <Box h={'72px'} w={'calc(100% - 240px)'} position={'fixed'} shadow={'lg'} ml={"240px"}>
      <Text fontWeight={'800'} fontSize={'2xl'} ml={'32px'} my={'16px'}>
        {convertPath(path)}
      </Text>
    </Box>
  )
}
