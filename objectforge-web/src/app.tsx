import Header from './components/Header'
import Sidebar from './components/Sidebar'
import BackTop from './components/BackTop'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes'

export default function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <RouterProvider router={router} />
      <BackTop />
    </>
  )
}

