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

    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,

    VStack,
    Spacer,
  } from '@chakra-ui/react'
import {
    DocumentData,
    collection,
    getDocs,
    query,
    where,
    getFirestore,
    connectFirestoreEmulator,
    enableIndexedDbPersistence,
    doc,
    getDoc,
    onSnapshot,
} from 'firebase/firestore'
import { DashboardRealtimeData, PagesContainer } from '../parts'
import ReactECharts from 'echarts-for-react'
import { useContext, useEffect, useState } from 'react'
import { SensingDataContext, useSensingData } from '../functional'
import { TbTriangleSquareCircleFilled } from 'react-icons/tb'
import { db } from '../../config/initialize/firebase'


//import fireStoreDB from "../../config/initialize/firebase"

export const columns = [
    { Header : "日時", accessor : "date" },
    { Header : "温度", accessor : "temp" },
    { Header : "水温", accessor : "watertemp" },
    { Header : "湿度", accessor : "humidity" },
    { Header : "EC", accessor : "ec" },
    { Header : "二酸化炭素", accessor : "co2" },
];

const today = new Date();

console.log(today)

/*
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
*/

type Props = {
    temperatureDatas: number[]
    waterTemperatureDatas: number[]
    times: string[]
    w?: string
    h?: string
  }

/*export const DataStorage = (hinichi: string) => {*/
export const DataStorage = () => {
  const {
    co2Datas,
    times,
    setTemperatureDatas,
    setWaterTemperatureDatas,
    setCo2Datas,
    setHumidityDatas,
    setEcDatas,
    setTimes,
  } = useContext(SensingDataContext)
  const nowDate = new Date().toISOString().slice(0, 10)
  const datas = useSensingData(nowDate)

  //const q = collection(db, 'sensing_data', hinichi, 'time')
  const q = collection(db, 'sensing_data', '2024-01-30', '00:00')
  const [datass, setDatas] = useState<DocumentData[]>([])
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
  //return datass


  useEffect(() => {
    setTemperatureDatas(datas.map((data) => data.temperature))
    setWaterTemperatureDatas(datas.map((data) => data.water_temperature))
    setCo2Datas(datas.map((data) => data.co2))
    setHumidityDatas(datas.map((data) => data.humidity))
    setEcDatas(datas.map((data) => data.ec))
    setTimes(datas.map((data) => data.time))
  }, [datas])

  //const docRef = doc(db, )

// useSensingDataのコード

  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();

  useEffect(() => {
    setInterval(() => {
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let dayofweek = d.getDay();

      const dayname = ['日', '月', '火', '水', '木', '金', '土'];

      setDate(year + '年' + month + '月' + day + '日' + '[' + dayname[dayofweek] +']');

      let hour = d.getHours().toString().padStart(2, '0');
      let minute = d.getMinutes().toString().padStart(2, '0');
      let seconds = d.getSeconds().toString().padStart(2, '0');
      setTime(hour + ':' + minute + ':' + seconds);
    }, 1000);
  }, []);
  //ネットのやつ
  const [todos, setTodos] = useState([]);

  const arrList = [];

  /*useEffect(() => {
    const fireStorePostData = collection(fireStoreDB, "todoposts");
    getDocs(fireStorePostData).then((snapShot) => {
      snapShot.forEach((docs) => {
        const doc = docs.data();
        arrList.push({ id: docs.id , title: doc.title , })
      })
    })
  })*/

  const option = {
    text: {
        
    },

    legend: {
      textStyle: {
        fontFamily: `'M PLUS Rounded 1c'`,
        fontWeight: '800',
      },
      top: 16,
    },
    
  }
  return (
    <PagesContainer>
        <Text></Text>
        {/* <p>{co2Datas}</p> */}
        {/* <p>{props.temperatureDatas}</p> */} //できていない行
        <p>{date}<span>{time}</span></p>
        <DashboardRealtimeData />
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>データ</TableCaption>
                <Thead>
                    <Tr>
                        <Th>日時</Th>
                        <Th>温度</Th>
                        <Th>水温</Th>
                        <Th>湿度</Th>
                        <Th>EC</Th>
                        <Th>二酸化炭素</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>2024-01-01</Td>
                        <Td>20℃</Td>
                        <Td>18℃</Td>
                        <Td>40%</Td>
                        <Td>1.01</Td>
                        <Td>1200</Td>
                    </Tr>
                    <Tr>
                        <Td>console.log($[today])</Td>
                        <Td>20℃</Td>
                        <Td>18℃</Td>
                        <Td>40%</Td>
                        <Td>1.01</Td>
                        <Td>1200</Td>
                    </Tr>
                </Tbody>

            </Table>
        </TableContainer>
    </PagesContainer>
  )
}