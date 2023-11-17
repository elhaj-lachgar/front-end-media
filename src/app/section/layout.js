import  'bootstrap/dist/css/bootstrap.css'
import Bootstrap from '../components/bootstrap/Bootstrap'

export default function SectionLayout({ children }) {
 return (
    <html lang="en">
      <body>
        {children}
        <Bootstrap/> 
      </body>
    </html>
  )
}
