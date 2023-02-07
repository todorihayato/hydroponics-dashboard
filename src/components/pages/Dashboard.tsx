import { Box, Text } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { SensingDataContext } from '../functional'
import { useSensingData } from '../functional/hooks/useSensingData'
import {
  PagesContainer,
  DashboardRealtimeData,
  DashboardMultiDatasChart,
} from '../parts'

export const Dashboard = () => {
  const {
    setTemperatureDatas,
    setWaterTemperatureDatas,
    setCo2Datas,
    setHumidityDatas,
    setEcDatas,
    setTimes,
  } = useContext(SensingDataContext)
  const nowDate = new Date().toISOString().slice(0, 10)
  const datas = useSensingData(nowDate)

  useEffect(() => {
    setTemperatureDatas(datas.map((data) => data.temperature))
    setWaterTemperatureDatas(datas.map((data) => data.water_temperature))
    setCo2Datas(datas.map((data) => data.co2))
    setHumidityDatas(datas.map((data) => data.humidity))
    setEcDatas(datas.map((data) => data.ec))
    setTimes(datas.map((data) => data.time))
  }, [datas])

  return (
    <PagesContainer>
      <Text fontWeight={'800'} fontSize={'2xl'}>
        Realtime Data
      </Text>
      <DashboardRealtimeData />
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
      >
        <Text
          fontWeight={'800'}
          fontSize={'2xl'}
          my={4}
          alignSelf={'flex-start'}
        >
          MultiDatas Chart
        </Text>
        <Box h={'calc(100vh - 424px)'}>
          <DashboardMultiDatasChart />
        </Box>
      </Box>
    </PagesContainer>
  )
}
