import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useControl } from '../functional/hooks/useControl'
import { useSetDoc } from '../functional/hooks/useSetDoc'
import { PagesContainer } from '../parts'
import { DragHandleIcon } from '@chakra-ui/icons'

type Time = `${number}${number}:${number}${number}` | `${string}:${string}`
type NumRange = [min: number, max: number]
type InitFlag = [
  fan: boolean,
  fertilizer: boolean,
  heater: boolean,
  light: boolean,
]

export const Control = () => {
  const values = useControl()
  const [fan, setFan] = useState<DocumentData>({})
  const [fertilizer, setFertilizer] = useState<DocumentData>({})
  const [heater, setHeater] = useState<DocumentData>({})
  const [light, setLight] = useState<DocumentData>({})
  const [co2Range, setCo2Range] = useState<NumRange>([100, 2000])
  const [ecValue, setEcValue] = useState<number>(0)
  const [wTempRange, setWTempRange] = useState<NumRange>([-10, 40])
  const [startTime, setStartTIme] = useState<[Time, number]>(['00:00', 0])
  const [endTime, setEndTIme] = useState<[Time, number]>(['23:55', 287])
  const [initFlags, setInitFlags] = useState<InitFlag>([
    false,
    false,
    false,
    false,
  ])
  useLayoutEffect(() => {
    setFan(values[0])
    setFertilizer(values[1])
    setHeater(values[2])
    setLight(values[3])
    initFlags.forEach((initFlag, i) => {
      if (i === 0 && !initFlag) {
        setCo2Range([values[0]?.min_co2 ?? 100, values[0]?.max_co2 ?? 1000])
      }
      if (i === 1 && !initFlag) {
        setEcValue(values[1]?.min_ec ?? 0)
      }
      if (i === 2 && !initFlag) {
        setWTempRange([
          values[2]?.min_w_temp ?? -10,
          values[2]?.max_w_temp ?? 40,
        ])
      }
      if (i === 3 && !initFlag) {
        setStartTIme([
          values[3]?.start_time ?? '00:00',
          convertTimeToValue(values[3]?.start_time ?? '00:00'),
        ])
        setEndTIme([
          values[3]?.end_time ?? '23:55',
          convertTimeToValue(values[3]?.end_time ?? '23:55'),
        ])
      }
    })
  }, [values])

  useEffect(() => {
    setInitFlags(newFlags('all'))
  }, [])

  const newFlags = (index?: number | 'all') => {
    const flags = initFlags
    if (typeof index === 'number') {
      flags[index] = true
    } else {
      flags.map(() => true)
    }
    return flags
  }

  const handleOnChangeFanSlider = (range: NumRange) => {
    setInitFlags(newFlags(0))
    setCo2Range(range)
  }

  const handleOnChangeFertilizerSlider = (value: number) => {
    setInitFlags(newFlags(1))
    setEcValue(value)
  }

  const handleOnChangeHeaterSlider = (range: NumRange) => {
    setInitFlags(newFlags(2))
    setWTempRange(range)
  }

  const handleOnChangeLightStartSlider = (value: number) => {
    setInitFlags(newFlags(3))
    setStartTIme([convertValueToTime(value), value])
  }

  const handleOnChangeLightEndSlider = (value: number) => {
    setInitFlags(newFlags(3))
    setEndTIme([convertValueToTime(value), value])
  }

  const handleOnClickSaveButton = async (
    docName: string,
    values: number[] | string[],
  ) => {
    await useSetDoc<number | string>(docName, values)
      .then(() => console.log('success'))
      .catch((e) => console.error(e))
  }

  const convertValueToTime = (value: number): Time => {
    const hour = Math.floor(value / 12)
      .toString()
      .padStart(2, '0')
    const minute = ((value % 12) * 5).toString().padStart(2, '0')
    return `${hour}:${minute}`
  }

  const convertTimeToValue = (time: Time) => {
    const [hour, minute] = time.split(':').map(Number)
    const value = hour * 12 + minute / 5
    return value
  }

  return (
    <PagesContainer>
      <Text fontWeight={'800'} fontSize={'2xl'} mb={4}>
        Current Settings
      </Text>
      <Box display={'flex'} w={'100%'} h={'28%'}>
        <Card
          shadow={'lg'}
          rounded={'xl'}
          bg={'white'}
          flexBasis={'25%'}
          mr={2}
        >
          <CardHeader fontWeight={'800'} fontSize={'lg'} p={4} pb={0}>
            Fan
          </CardHeader>
          <CardBody
            p={4}
            pt={0}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text
                fontWeight={'800'}
                fontSize={'4xl'}
                _after={{ content: '"ppm"', fontSize: '2xl' }}
              >
                {fan?.min_co2}
              </Text>
              <Box my={'-8px'}>
                <Text fontWeight={'800'} fontSize={'3xl'}>
                  to
                </Text>
              </Box>
              <Text
                fontWeight={'800'}
                fontSize={'4xl'}
                _after={{ content: '"ppm"', fontSize: '2xl' }}
              >
                {fan?.max_co2}
              </Text>
            </Box>
          </CardBody>
        </Card>
        <Card
          shadow={'lg'}
          rounded={'xl'}
          bg={'white'}
          flexBasis={'25%'}
          mx={2}
        >
          <CardHeader fontWeight={'800'} fontSize={'lg'} p={4} pb={0}>
            Fertilizer
          </CardHeader>
          <CardBody
            p={4}
            pt={0}
            h={'100%'}
            display={'flex'}
            alignItems={'center'}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text
                mt={'-8px'}
                fontWeight={'800'}
                fontSize={'4xl'}
                _after={{ content: '"mS/cm"', fontSize: '2xl' }}
              >
                {fertilizer?.min_ec}
              </Text>
              <Text fontWeight={'800'} fontSize={'3xl'} mt={'-8px'}>
                or berrow
              </Text>
            </Box>
          </CardBody>
        </Card>
        <Card
          shadow={'lg'}
          rounded={'xl'}
          bg={'white'}
          flexBasis={'25%'}
          mx={2}
        >
          <CardHeader fontWeight={'800'} fontSize={'lg'} p={4} pb={0}>
            Heater
          </CardHeader>
          <CardBody p={4} pt={0} display={'flex'} alignItems={'center'}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text
                mt={'-8px'}
                fontWeight={'800'}
                fontSize={'4xl'}
                _after={{ content: '"℃"', fontSize: '2xl' }}
              >
                {heater?.min_w_temp}
              </Text>
              <Box>
                <Text my={'-8px'} fontWeight={'800'} fontSize={'3xl'}>
                  to
                </Text>
              </Box>
              <Text
                fontWeight={'800'}
                fontSize={'4xl'}
                _after={{ content: '"℃"', fontSize: '2xl' }}
              >
                {heater?.max_w_temp}
              </Text>
            </Box>
          </CardBody>
        </Card>
        <Card
          shadow={'lg'}
          rounded={'xl'}
          bg={'white'}
          flexBasis={'25%'}
          ml={2}
        >
          <CardHeader fontWeight={'800'} fontSize={'lg'} p={4} pb={0}>
            Light
          </CardHeader>
          <CardBody p={4} pt={0} display={'flex'} alignItems={'center'}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text mt={'-8px'} fontWeight={'800'} fontSize={'4xl'}>
                {light?.start_time}
              </Text>
              <Box my={'-8px'}>
                <Text fontWeight={'800'} fontSize={'3xl'}>
                  to
                </Text>
              </Box>
              <Text fontWeight={'800'} fontSize={'4xl'}>
                {light?.end_time}
              </Text>
            </Box>
          </CardBody>
        </Card>
      </Box>
      <Text fontWeight={'800'} fontSize={'2xl'} my={4}>
        Change Settings
      </Text>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        w={'100%'}
        h={"51.7vh"}
      >
        <Card shadow={'lg'} rounded={'xl'} bg={'white'} mb={2}>
          <CardHeader fontWeight={'800'} fontSize={'lg'} p={4} pb={0}>
            Fan
          </CardHeader>
          <CardBody p={4} pt={0}>
            <HStack mt={"-27px"}>
              <VStack w={'100%'} mx={6}>
                <HStack mb={"-12px"}>
                  <Text fontWeight={'800'} fontSize={'3xl'}>
                    {co2Range[0]}
                  </Text>
                  <Text fontWeight={'800'} fontSize={'3xl'}>
                    ~
                  </Text>
                  <Text fontWeight={'800'} fontSize={'3xl'}>
                    {co2Range[1]}
                  </Text>
                </HStack>
                <RangeSlider
                  min={100}
                  max={2000}
                  step={10}
                  colorScheme={'gray'}
                  value={[co2Range[0], co2Range[1]]}
                  onChange={(value) =>
                    handleOnChangeFanSlider(value as NumRange)
                  }
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={6} index={0}>
                    <Box>
                      <DragHandleIcon boxSize={'.75rem'} />
                    </Box>
                  </RangeSliderThumb>
                  <RangeSliderThumb boxSize={6} index={1}>
                    <Box>
                      <DragHandleIcon boxSize={'.75rem'} />
                    </Box>
                  </RangeSliderThumb>
                </RangeSlider>
              </VStack>
              <Button
                bg={'teal.200'}
                onClick={() => handleOnClickSaveButton('fan', co2Range)}
              >
                SAVE
              </Button>
            </HStack>
          </CardBody>
        </Card>
        <Card shadow={'lg'} rounded={'xl'} bg={'white'} my={2}>
          <CardHeader fontWeight={'800'} fontSize={'lg'} p={4} pb={0}>
            Fertilizer
          </CardHeader>
          <CardBody p={4} pt={0}>
            <HStack mt={'-27px'}>
              <VStack w={'100%'} mx={6}>
                <HStack mb={"-12px"}>
                  <Text fontWeight={'800'} fontSize={'3xl'}>
                    {ecValue}
                  </Text>
                </HStack>
                <Slider
                  min={0}
                  max={2}
                  value={ecValue}
                  step={0.1}
                  colorScheme={'gray'}
                  onChange={(value) => handleOnChangeFertilizerSlider(value)}
                >
                  <SliderTrack />
                  <SliderThumb boxSize={6}>
                    <Box>
                      <DragHandleIcon boxSize={'.75rem'} />
                    </Box>
                  </SliderThumb>
                </Slider>
              </VStack>
              <Button
                bg={'teal.200'}
                onClick={() => handleOnClickSaveButton('fertilizer', [ecValue])}
              >
                SAVE
              </Button>
            </HStack>
          </CardBody>
        </Card>
        <Card shadow={'lg'} rounded={'xl'} bg={'white'} my={2}>
          <CardHeader fontWeight={'800'} fontSize={'lg'} p={4} pb={0}>
            Heater
          </CardHeader>
          <CardBody p={4} pt={0}>
            <HStack mt={'-27px'}>
              <VStack w={'100%'} mx={6}>
                <HStack mb={"-12px"}>
                  <Text fontWeight={'800'} fontSize={'3xl'}>
                    {wTempRange[0]}
                  </Text>
                  <Text fontWeight={'800'} fontSize={'3xl'}>
                    ~
                  </Text>
                  <Text fontWeight={'800'} fontSize={'3xl'}>
                    {wTempRange[1]}
                  </Text>
                </HStack>
                <RangeSlider
                  min={-10}
                  max={40}
                  colorScheme={'gray'}
                  value={[wTempRange[0], wTempRange[1]]}
                  onChange={(value) =>
                    handleOnChangeHeaterSlider(value as NumRange)
                  }
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={6} index={0}>
                    <Box>
                      <DragHandleIcon boxSize={'.75rem'} />
                    </Box>
                  </RangeSliderThumb>
                  <RangeSliderThumb boxSize={6} index={1}>
                    <Box>
                      <DragHandleIcon boxSize={'.75rem'} />
                    </Box>
                  </RangeSliderThumb>
                </RangeSlider>
              </VStack>
              <Button
                bg={'teal.200'}
                onClick={() => handleOnClickSaveButton('heater', wTempRange)}
              >
                SAVE
              </Button>
            </HStack>
          </CardBody>
        </Card>
        <Card shadow={'lg'} rounded={'xl'} bg={'white'} mt={2}>
          <CardHeader fontWeight={'800'} fontSize={'lg'} p={4} pb={0}>
            Light
          </CardHeader>
          <CardBody p={4} pt={0}>
            <HStack mt={'-27px'}>
              <VStack w={'100%'} mx={6}>
                <HStack mb={"-12px"}>
                  <Text fontWeight={'800'} fontSize={'3xl'}>
                    {startTime[0]}
                  </Text>
                  <Text fontWeight={'800'} fontSize={'3xl'}>
                    ~
                  </Text>
                  <Text fontWeight={'800'} fontSize={'3xl'}>
                    {endTime[0]}
                  </Text>
                </HStack>
                <HStack w={'100%'}>
                  <Slider
                    mr={4}
                    min={0}
                    max={287}
                    colorScheme={'gray'}
                    value={startTime[1]}
                    onChange={(value) => handleOnChangeLightStartSlider(value)}
                  >
                    <SliderTrack />
                    <SliderThumb boxSize={6}>
                      <Box>
                        <DragHandleIcon boxSize={'.75rem'} />
                      </Box>
                    </SliderThumb>
                  </Slider>
                  <Slider
                    ml={4}
                    min={0}
                    max={287}
                    colorScheme={'gray'}
                    value={endTime[1]}
                    onChange={(value) => handleOnChangeLightEndSlider(value)}
                  >
                    <SliderTrack />
                    <SliderThumb boxSize={6}>
                      <Box>
                        <DragHandleIcon boxSize={'.75rem'} />
                      </Box>
                    </SliderThumb>
                  </Slider>
                </HStack>
              </VStack>
              <Button
                bg={'teal.200'}
                onClick={() =>
                  handleOnClickSaveButton('light', [startTime[0], endTime[0]])
                }
              >
                SAVE
              </Button>
            </HStack>
          </CardBody>
        </Card>
      </Box>
    </PagesContainer>
  )
}
