/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../config/initialize/firebase'

export const useSetDoc = async <T,>(docName: string, values: T[]) => {
  const notNull = <T,>(array: Array<T | null | undefined>): T[] => {
    return array.filter((t): t is T => t != null)
  }
  const safeValues = notNull(values)
  const docRef = doc(db, 'control', docName)
  const setValues = () => {
    if (docName === 'fan') {
      return {
        min_co2: safeValues[0],
        max_co2: safeValues[1],
      }
    }
    if (docName === 'fertilizer') {
      return {
        min_ec: safeValues[0],
      }
    }
    if (docName === 'heater') {
      return {
        min_w_temp: safeValues[0],
        max_w_temp: safeValues[1],
      }
    }
    if (docName === 'light') {
      return {
        start_time: safeValues[0],
        end_time: safeValues[1],
      }
    }
  }
  await setDoc(docRef, setValues())
}
