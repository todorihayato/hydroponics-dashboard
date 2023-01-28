import { DocumentData } from "firebase/firestore"
import { createContext, Dispatch, ReactNode, useState } from "react"

type SensingDataContextType = {
  sensingData: DocumentData[]
  setSensingData: Dispatch<React.SetStateAction<DocumentData[]>>
}

type Props = {
  children: ReactNode
}

export const SensingDataContext = createContext<SensingDataContextType>(
  {} as SensingDataContextType
)

export const SensingDataProvider = (props: Props) => {
  const [sensingData, setSensingData] = useState<DocumentData[]>([])
  return (
    <SensingDataContext.Provider value={{sensingData, setSensingData}}>
      {props.children}
    </SensingDataContext.Provider>
  )
}