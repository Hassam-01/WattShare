import './App.css'
import { Route, Routes } from "react-router"
import LandingPage from './pages/landingpage'
import HomePage from './pages/homePage'
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
    </Routes>

    </>
  )
}

export default App
