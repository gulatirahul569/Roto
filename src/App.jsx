import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import New from './Mainlinks/New'
import Bags from './Mainlinks/Bags'
import HeaderSlider from './Components/HeaderSlider'
import Navbar from './Components/Navbar'
import Section1 from './Pages/Section1'
import Section2 from './Pages/Section2'
import Shoes from './Mainlinks/Shoes'
import Accessories from './Mainlinks/Accessories'
import Sling from './Mainlinks/Sling'
import Sale from './Mainlinks/Sale'

const App = () => {
  return (
    <BrowserRouter>
      <HeaderSlider />
      <Navbar />

      <Routes>
        <Route path="/" element={
          <>
            <Section1 />
            <Section2 />
          </>
        } />

        <Route path="/bags" element={<Bags />} />
        <Route path="/new" element={<New />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/sling" element={<Sling />} />
        <Route path="/sale" element={<Sale />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App