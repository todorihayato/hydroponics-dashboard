import { Box, Text } from '@chakra-ui/react'
import ReactECharts from 'echarts-for-react'

type Props = {
  waterTemperatureArray: number[]
  w?: string
  h?: string
}

export const WaterTemperatureChart = (props: Props) => {
  const option = {
    series: [
      {
        data: [
          {
            value:
              props.waterTemperatureArray[
                props.waterTemperatureArray.length - 1
              ],
          },
        ],
        type: 'gauge',
        center: ['50%', '45%'],
        startAngle: 200,
        endAngle: -20,
        min: -10,
        max: 40,
        splitNumber: 5,
        itemStyle: {
          color: '#FFAB91',
        },
        progress: {
          show: true,
          width: 10,
          roundCap: true,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: true,
          roundCap: true,
          lineStyle: {
            width: 10,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 24,
          fontFamily: `'M PLUS Rounded 1c'`,
          fontWeight: 'bolder',
          formatter: '{value}',
          color: 'inherit',
        },
      },
    ],
  }
  return (
    <Box
      w={`${props.w}`}
      h={`${props.h}`}
      shadow={'lg'}
      rounded={'xl'}
      bg={'white'}
      pos={'relative'}
    >
      <Text
        fontWeight={'800'}
        fontSize={'md'}
        pos={'absolute'}
        left={4}
        top={2}
        letterSpacing={'.05rem'}
      >
        Water Temp
      </Text>
      <ReactECharts option={option} />
    </Box>
  )
}
