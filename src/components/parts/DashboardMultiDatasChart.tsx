import { Box } from '@chakra-ui/react'
import { useContext } from 'react'
import {
  DashboardMultiDatasChartCo2,
  DashboardMultiDatasChartEc,
  DashboardMultiDatasChartHumidity,
  DashboardMultiDatasChartTempAndWTemp,
} from '../elements'
import { SensingDataContext } from '../functional'

export const DashboardMultiDatasChart = () => {
  const w = 'calc(33.1% - 8px)'
  const h = '100%'
  const {
    temperatureDatas,
    waterTemperatureDatas,
    co2Datas,
    humidityDatas,
    ecDatas,
    times,
  } = useContext(SensingDataContext)
  return (
    <Box display={'flex'} h={'100%'} justifyContent={'space-between'}>
      <DashboardMultiDatasChartTempAndWTemp
        temperatureDatas={temperatureDatas}
        waterTemperatureDatas={waterTemperatureDatas}
        times={times}
        w={w}
        h={h}
      />
      <DashboardMultiDatasChartHumidity
        humidityDatas={humidityDatas}
        times={times}
        w={w}
        h={h}
      />
      <Box
        w={w}
        h={h}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
      >
        <DashboardMultiDatasChartEc
          ecDatas={ecDatas}
          times={times}
          w={'100%'}
          h={'calc(50% - 8px)'}
        />
        <DashboardMultiDatasChartCo2
          co2Datas={co2Datas}
          times={times}
          w={'100%'}
          h={'calc(50% - 8px)'}
        />
      </Box>
    </Box>
  )
}
