import { Box, Divider, TabList, Tabs, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutTab } from './LayoutTab'

export const LayoutSidebar = () => {
  const navigate = useNavigate()
  const convertPath = (index: number) => {
    switch (index) {
      case 0:
        return ''
      case 1:
        return 'ec'
      case 2:
        return 'co2'
      case 3:
        return 'temperature'
      case 4:
        return 'water_temperature'
      case 5:
        return 'humidity'
      case 6:
        return 'control'
      default:
        return ''
    }
  }
  return (
    <Box h={'100vh'} w={'240px'} shadow={'xl'} position={'fixed'} zIndex={'3'}>
      <Text
        w={'100%'}
        textAlign={'center'}
        py={4}
        fontWeight={'800'}
        fontSize={'xl'}
      >
        <Link to='/'>IoT Hydroponics</Link>
      </Text>
      <Box display={'flex'} justifyContent={'center'}>
        <Divider w={'152.82px'} opacity={1}/>
      </Box>
      <Box mt={'32px'} w={'100%'} display={'flex'} justifyContent={'center'}>
        <Tabs
          orientation={'vertical'}
          variant={'unstyled'}
          onChange={(index) => navigate(`/${convertPath(index)}`)}
        >
          <TabList>
            <LayoutTab>Dashboard</LayoutTab>
            <Divider opacity={1}/>
            <LayoutTab>EC</LayoutTab>
            <LayoutTab>
              CO<sub>2</sub>
            </LayoutTab>
            <LayoutTab>Temperature</LayoutTab>
            <LayoutTab>Water Temp</LayoutTab>
            <LayoutTab>Humidity</LayoutTab>
            <Divider opacity={1}/>
            <LayoutTab>Control</LayoutTab>
          </TabList>
        </Tabs>
      </Box>
    </Box>
  )
}
