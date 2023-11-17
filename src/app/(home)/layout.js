import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
const inter = Inter({ subsets: ['latin'] })
import Bootstrap from '../components/bootstrap/Bootstrap'
import Navbar from '../components/navbar/Navbar'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Bootstrap/>
        </body>
    </html>
  )
}