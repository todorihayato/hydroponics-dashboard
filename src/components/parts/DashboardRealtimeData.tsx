import { Box } from '@chakra-ui/react'
import { useContext } from 'react'
import {
  DashboardRealtimeDataCo2,
  DashboardRealtimeDataEc,
  DashboardRealtimeDataHumidity,
  DashboardRealtimeDataTemperature,
  DashboardRealtimeDataWaterTemperature,
} from '../elements'
import { SensingDataContext } from '../functional'

export const DashboardRealtimeData = () => {
  const w = 'calc(20% - 12px)'
  const h = '200px'
  const {
    temperatureDatas,
    waterTemperatureDatas,
    co2Datas,
    humidityDatas,
    ecDatas,
  } = useContext(SensingDataContext)
  return (
    <Box display={'flex'} w={'100%'} justifyContent={'space-between'} mt={4}>
      <DashboardRealtimeDataTemperature
        temperatureArray={temperatureDatas}
        w={w}
        h={h}
      />
      <DashboardRealtimeDataWaterTemperature
        waterTemperatureArray={waterTemperatureDatas}
        w={w}
        h={h}
      />
      <DashboardRealtimeDataHumidity
        humidityArray={humidityDatas}
        w={w}
        h={h}
      />
      <DashboardRealtimeDataEc ecArray={ecDatas} w={w} h={h} />
      <DashboardRealtimeDataCo2 co2Array={co2Datas} w={w} h={h} />
    </Box>
  )
}
