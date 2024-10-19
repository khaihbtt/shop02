import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./page/HomePage"
import CreatePage from "./page/CreatePage"
import Navbar from "./components/Navbar"


function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar/>
      <Routes>
        <Route path="/" element={< HomePage/>} />
        <Route path="/create" element={< CreatePage/>} />

      </Routes>
      
    </Box>
  )
}

export default App
