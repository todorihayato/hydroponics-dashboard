import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useFirestore } from '../functional/hooks/useFirestore'
import { Chart, ChartOptionType, PagesContainer } from '../parts'

export const Dashboard = () => {
  const [isPageRefreshed, setIsPageRefreshed] = useState<boolean>(false)
  const [xAxisData, setXAxisData] = useState<string[]>([])
  const [temperatureData, setTemperatureData] = useState<string[]>([])
  const nowDate = new Date().toISOString().slice(0, 10)
  const datas = useFirestore(nowDate)
  const option: ChartOptionType = {
    title: {
      text: 'Echartsの重複レンダリングを修正する！！！',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C',
      },
    },
    series: [
      {
        name: 'Temperature',
        type: 'line',
        smooth: true,
        data: temperatureData,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      },
    ],
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
      <Chart option={option} />
    </PagesContainer>
  )
}
