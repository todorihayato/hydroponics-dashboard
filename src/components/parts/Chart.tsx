import { Box } from '@chakra-ui/react'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

export type ChartOptionType = echarts.EChartOption
type Props = {
  option: ChartOptionType
}

export const Chart = (props: Props) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)
      chart.setOption(props.option)
    }
  }, [props.option, chartRef])
  return <Box ref={chartRef} w={'100%'} h={'100%'}/>
}
