import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../../../config/initialize/firebase'

export const useControl = () => {
  const q = collection(db, 'control')
  const [values, setValues] = useState<DocumentData[]>([])
  onSnapshot(q, (snapShot) => {
    const newValues: DocumentData[] = []
    snapShot.docChanges().forEach((change) => {
      if (change.type === 'modified' || change.type === 'added') {
        newValues.push(change.doc.data())
      }
    })
    setValues(newValues)
  })
  return values
}
