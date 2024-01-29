import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Co2,
  Ec,
  Humidity,
  Dashboard,
  Temperature,
  WaterTemperature,
  Notfound,
  Control,
  DataStorage
} from '../components/pages'
import { Layout } from '../components/parts'

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ec" element={<Ec />} />
          <Route path="humidity" element={<Humidity />} />
          <Route path="temperature" element={<Temperature />} />
          <Route path="water_temperature" element={<WaterTemperature />} />
          <Route path="co2" element={<Co2 />} />
          <Route path='control' element={<Control />} />
          <Route path="datastorage" element={<DataStorage />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
