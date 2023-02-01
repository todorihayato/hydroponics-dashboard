import { collection, onSnapshot, DocumentData } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../../../config/initialize/firebase'

export const useSensingData = (date: string) => {
  const q = collection(db, 'sensing_data', date, 'time')
  const [datas, setDatas] = useState<DocumentData[]>([])
  onSnapshot(q, (snapShot) => {
    const newDatas: DocumentData[] = []
    snapShot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        newDatas.push(change.doc.data())
      }
      if (change.type === 'modified') {
        // console.log('change.type is modified...')
      }
      if (change.type === 'removed') {
        // console.log('change.type is removed...')
      }
    })
    setDatas(newDatas)
  })
  return datas
}
