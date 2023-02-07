import { Box, Divider, TabList, Tabs, Text } from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutTab } from './LayoutTab'

type PathName = '' | 'temperature' | 'water_temperature' | 'co2' | 'humidity' | 'ec' | 'control'

export const LayoutSidebar = () => {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const revertPath = (currentPath: PathName) => {
    const pathName = currentPath.slice(1)
    switch (pathName) {
      case '':
        return 0
      case 'temperature':
        return 1
      case 'water_temperature':
        return 2
      case 'co2':
        return 3
      case 'humidity':
        return 4
      case 'ec':
        return 5
      case 'control':
        return 6
      default:
        return 0
    }
  }
  const convertPath = (index: number) => {
    switch (index) {
      case 0:
        return ''
      case 1:
        return 'temperature'
      case 2:
        return 'water_temperature'
      case 3:
        return 'co2'
      case 4:
        return 'humidity'
      case 5:
        return 'ec'
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
          defaultIndex={revertPath(currentPath as PathName)}
          orientation={'vertical'}
          variant={'unstyled'}
          onChange={(index) => navigate(`/${convertPath(index)}`)}
        >
          <TabList>
            <LayoutTab>Dashboard</LayoutTab>
            <Divider opacity={1}/>
            <LayoutTab>Temperature</LayoutTab>
            <LayoutTab>Water Temp</LayoutTab>
            <LayoutTab>
              CO<sub>2</sub>
            </LayoutTab>
            <LayoutTab>Humidity</LayoutTab>
            <LayoutTab>EC</LayoutTab>
            <Divider opacity={1}/>
            <LayoutTab>Control</LayoutTab>
          </TabList>
        </Tabs>
      </Box>
    </Box>
  )
}
