

import Bootstrap from '../components/bootstrap/Bootstrap'
import  'bootstrap/dist/css/bootstrap.css'
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}


export default function RootLayout({ children }) {

 return (
    <html lang="en"> 
        <body>
          {children}
          <Bootstrap/>
        </body>
    </html>
  )
}
