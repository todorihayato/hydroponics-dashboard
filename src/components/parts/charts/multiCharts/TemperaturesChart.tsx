import { Box } from '@chakra-ui/react'
import ReactECharts from 'echarts-for-react'
type Props = {
  temperatureArray: number[]
  waterTemperatureArray: number[]
  timeArray: string[]
  w?: string
  h?: string
}

export const TemperaturesChart = (props: Props) => {
  const option = {
    grid: {
      top: '72px',
      bottom: '40px'
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      textStyle: {
        fontFamily: `'M PLUS Rounded 1c'`,
        fontWeight: '800'
      },
      top: 16
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      alignWithLabel: true,
      data: props.timeArray,
      axisLabel: {
        fontFamily: `'M PLUS Rounded 1c'`,
        fontWeight: '800',
        fontSize: 10,
        margin: 12
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}°C',
        fontFamily: `'M PLUS Rounded 1c'`,
        fontWeight: '800',
        fontSize: 10,
        margin: 12
      },
    },
    series: [
      {
        name: 'Temp',
        type: 'line',
        smooth: true,
        data: props.temperatureArray,
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
      {
        name: 'Water Temp',
        type: 'line',
        smooth: true,
        data: props.waterTemperatureArray,
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
  return (
    <Box
      w={`${props.w}`}
      h={`${props.h}`}
      shadow={'xl'}
      rounded={'xl'}
      bg={'white'}
    >
      <ReactECharts option={option} style={{height: '48vh'}}/>
    </Box>
  )
}
