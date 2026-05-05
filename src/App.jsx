import React from 'react'
import Navbar from './Components/Navbar'
import Section1 from './Pages/Section1'
import Section2 from './Pages/Section2'
import HeaderSlider from './Components/HeaderSlider'

const App = () => {
  return (
    
    <div>
      <HeaderSlider />
      <Navbar />
      <Section1 />
      <Section2 />
    </div>
  )
}

export default App
