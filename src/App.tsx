import './App.css'
import { Route, Routes } from "react-router"
import LandingPage from './pages/landingpage'
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}>
      </Route>
    </Routes>

    </>
  )
}

export default App
