import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Co2,Ec,Humidity,Home,Temperature,WaterTemperature } from '../components/pages'
import { Layout } from '../components/parts'

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ec" element={<Ec />} />
          <Route path="humidity" element={<Humidity />} />
          <Route path="temperature" element={<Temperature />} />
          <Route path="water_temperature" element={<WaterTemperature />} />
          <Route path="co2" element={<Co2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
