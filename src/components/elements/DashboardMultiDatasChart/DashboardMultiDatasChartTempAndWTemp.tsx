import { Box } from '@chakra-ui/react'
import ReactECharts from 'echarts-for-react'
type Props = {
  temperatureDatas: number[]
  waterTemperatureDatas: number[]
  times: string[]
  w?: string
  h?: string
}

export const DashboardMultiDatasChartTempAndWTemp = (props: Props) => {
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
      data: props.times,
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
        data: props.temperatureDatas,
        lineStyle: {
          color: '#F6E05E'
        },
        itemStyle: {
          color: '#F6E05E'
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
          label: {
            fontFamily: `'M PLUS Rounded 1c'`,
            fontWeight: '800'
          },
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
          label: {
            fontFamily: `'M PLUS Rounded 1c'`,
            fontWeight: '800'
          },
        },
      },
      {
        name: 'Water Temp',
        type: 'line',
        smooth: true,
        data: props.waterTemperatureDatas,
        lineStyle: {
          color: '#4FD1C5'
        },
        itemStyle: {
          color: '#4FD1C5'
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
          label: {
            fontFamily: `'M PLUS Rounded 1c'`,
            fontWeight: '800'
          },
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
          label: {
            fontFamily: `'M PLUS Rounded 1c'`,
            fontWeight: '800'
          },
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
      <ReactECharts option={option} style={{height: '100%'}}/>
    </Box>
  )
}
