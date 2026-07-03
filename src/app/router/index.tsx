import { createBrowserRouter } from 'react-router-dom'
import { GamesPage } from '@/pages/games'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GamesPage />,
  },
])
