import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Co2,
  Co2ja,
  Ec,
  Humidity,
  Dashboard,
  Dashboardja,
  Temperature,
  WaterTemperature,
  Notfound,
  DataStorage,
  Control,
} from '../components/pages'
import { Layout } from '../components/parts'

export const RouterProvider = () => {
  const style = {
    width : "50%",
    margin: "0 auto",
    marginTop: 150
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ja" element={<Dashboardja />} />
          <Route path="ec" element={<Ec />} />
          <Route path="humidity" element={<Humidity />} />
          <Route path="temperature" element={<Temperature />} />
          <Route path="water_temperature" element={<WaterTemperature />} />
          <Route path="co2" element={<Co2 />} />
          <Route path="co2ja" element={<Co2ja />} />
          <Route path='control' element={<Control />} />
          <Route path='datastorage' element={<DataStorage />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
