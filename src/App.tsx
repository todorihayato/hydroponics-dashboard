import { SensingDataProvider } from './components/functional/contexts/SensingDataContext'
import { RouterProvider } from './config/router'

export const App = () => (
  <SensingDataProvider>
    <RouterProvider />
  </SensingDataProvider>
)

/*export const App = () => (
  <SensingDataProvider>
    <RouterProvider />
  </SensingDataProvider>
)*/
