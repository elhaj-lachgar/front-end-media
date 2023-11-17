import Bootstrap from '../components/bootstrap/Bootstrap'
import  'bootstrap/dist/css/bootstrap.css'
import React from 'react'

function Authlayout({children}) {
  return (
    <html lang="en">
    <body>
      {children}
      <Bootstrap/>
      </body>
  </html>
  )
}

export default Authlayout
