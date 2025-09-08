import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import FeatureDetail from '../pages/FeatureDetail'
import Plaza from '../pages/Plaza'
import Reviews from '../pages/Reviews'
import Pricing from '../pages/Pricing'
import NotFound from '../pages/NotFound'

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/features/:slug', element: <FeatureDetail /> },
  { path: '/plaza', element: <Plaza /> },
  { path: '/reviews', element: <Reviews /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '*', element: <NotFound /> }
]

export const router = createBrowserRouter(routes)
