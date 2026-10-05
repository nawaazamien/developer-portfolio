import { createBrowserRouter, Navigate } from 'react-router'
import { CreditsPage } from '../pages/CreditsPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { CaseStudyRoute } from './CaseStudyRoute'
import { RootLayout } from './RootLayout'

export const routes = [
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects/:slug', element: <CaseStudyRoute /> },
      { path: 'credits', element: <CreditsPage /> },
      {
        path: 'projects',
        element: <Navigate to={{ pathname: '/', hash: '#projects' }} replace />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

/** Vite's base ("/" or "/developer-portfolio/") without the trailing slash. */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export const router = createBrowserRouter(routes, { basename })
