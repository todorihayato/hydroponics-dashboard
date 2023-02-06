import React, { createContext, Dispatch, ReactNode, useState } from 'react'

type SensingDataContextType = {
  times: string[]
  setTimes: Dispatch<React.SetStateAction<string[]>>
  temperatureDatas: number[]
  setTemperatureDatas: Dispatch<React.SetStateAction<number[]>>
  waterTemperatureDatas: number[]
  setWaterTemperatureDatas: Dispatch<React.SetStateAction<number[]>>
  co2Datas: number[]
  setCo2Datas: Dispatch<React.SetStateAction<number[]>>
  humidityDatas: number[]
  setHumidityDatas: Dispatch<React.SetStateAction<number[]>>
  ecDatas: number[]
  setEcDatas: Dispatch<React.SetStateAction<number[]>>
}

type Props = {
  children: ReactNode
}

export const SensingDataContext = createContext<SensingDataContextType>(
  {} as SensingDataContextType,
)

export const SensingDataProvider = (props: Props) => {
  const [times, setTimes] = useState<string[]>([])
  const [temperatureDatas, setTemperatureDatas] = useState<number[]>([])
  const [waterTemperatureDatas, setWaterTemperatureDatas] = useState<number[]>(
    [],
  )
  const [co2Datas, setCo2Datas] = useState<number[]>([])
  const [humidityDatas, setHumidityDatas] = useState<number[]>([])
  const [ecDatas, setEcDatas] = useState<number[]>([])
  return (
    <SensingDataContext.Provider
      value={{
        times,
        setTimes,
        temperatureDatas,
        setTemperatureDatas,
        waterTemperatureDatas,
        setWaterTemperatureDatas,
        co2Datas,
        setCo2Datas,
        humidityDatas,
        setHumidityDatas,
        ecDatas,
        setEcDatas,
      }}
    >
      {props.children}
    </SensingDataContext.Provider>
  )
}
