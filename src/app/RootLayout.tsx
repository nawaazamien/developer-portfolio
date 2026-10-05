import { Outlet } from 'react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ScrollManager } from './ScrollManager'

export function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <ScrollManager />
    </>
  )
}
