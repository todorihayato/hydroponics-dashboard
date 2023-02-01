import { Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSensingData } from '../functional/hooks/useSensingData'
import {
  Co2Chart,
  EcChart,
  HumidityChart,
  PagesContainer,
  TemperatureChart,
  TemperaturesChart,
  WaterTemperatureChart,
} from '../parts'

export const Dashboard = () => {
  const [times, setTimes] = useState<string[]>([])
  const [temperatureDatas, setTemperatureDatas] = useState<number[]>([])
  const [waterTemperatureDatas, setWaterTemperatureDatas] = useState<number[]>(
    [],
  )
  const [co2Datas, setCo2Datas] = useState<number[]>([])
  const [humidityDatas, setHumidityDatas] = useState<number[]>([])
  const [ecDatas, setEcDatas] = useState<number[]>([])
  const nowDate = new Date().toISOString().slice(0, 10)
  const datas = useSensingData(nowDate)

  useEffect(() => {
    setTemperatureDatas(datas.map((data) => Math.floor(data.temperature)))
    setWaterTemperatureDatas(
      datas.map((data) => Math.floor(data.water_temperature)),
    )
    setCo2Datas(datas.map((data) => data.co2))
    setHumidityDatas(datas.map((data) => Math.floor(data.humidity)))
    setEcDatas(datas.map((data) => Math.floor(data.ec * 100) / 100))
    setTimes(datas.map((data) => data.time))
  }, [datas])

  return (
    <PagesContainer>
      <Text fontWeight={'800'} fontSize={'2xl'}>
        Realtime Data
      </Text>
      <Box display={'flex'} w={'100%'} justifyContent={'space-between'} mt={4}>
        <TemperatureChart
          temperatureArray={temperatureDatas}
          w={'calc(20% - 12px)'}
          h={'200px'}
        />
        <WaterTemperatureChart
          waterTemperatureArray={waterTemperatureDatas}
          w={'calc(20% - 12px)'}
          h={'200px'}
        />
        <Co2Chart co2Array={co2Datas} w={'calc(20% - 12px)'} h={'200px'} />
        <HumidityChart
          humidityArray={humidityDatas}
          w={'calc(20% - 12px)'}
          h={'200px'}
        />
        <EcChart ecArray={ecDatas} w={'calc(20% - 12px)'} h={'200px'} />
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        h={{ xl: '640px' }}
      >
        <Text
          fontWeight={'800'}
          fontSize={'2xl'}
          my={4}
          alignSelf={'flex-start'}
        >
          MultiDatas Chart / とりあえず制御機能実装しちゃおう
        </Text>
        <Box w={'100%'} display={'flex'} justifyContent={'space-between'}>
          <TemperaturesChart
            temperatureArray={temperatureDatas}
            waterTemperatureArray={waterTemperatureDatas}
            timeArray={times}
            w={'calc(50% - 8px)'}
          />
          <TemperaturesChart
            temperatureArray={temperatureDatas}
            waterTemperatureArray={waterTemperatureDatas}
            timeArray={times}
            w={'calc(50% - 8px)'}
          />
        </Box>
      </Box>
    </PagesContainer>
  )
}
