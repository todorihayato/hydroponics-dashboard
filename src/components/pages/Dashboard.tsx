import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useFirestore } from '../functional/hooks/useFirestore'
import { PagesContainer } from '../parts'
import ReactECharts from 'echarts-for-react';

export const Dashboard = () => {
  const [isPageRefreshed, setIsPageRefreshed] = useState<boolean>(false)
  const [xAxisData, setXAxisData] = useState<string[]>([])
  const [temperatureData, setTemperatureData] = useState<string[]>([])
  const nowDate = new Date().toISOString().slice(0, 10)
  const datas = useFirestore(nowDate)
  const option = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: temperatureData,
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  }

  useEffect(() => {
    setXAxisData(datas.map((data) => data.time))
    setTemperatureData(datas.map((data) => data.temperature))
  }, [datas, isPageRefreshed])


  return (
    <PagesContainer>
      <Button onClick={() => setIsPageRefreshed(!isPageRefreshed)}>
        RELOAD
      </Button>
      <ReactECharts option={option} />
    </PagesContainer>
  )
}
