import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Memories from './pages/Memories'
import Distance from './pages/Distance'
import Present from './pages/Present'
import Message from './pages/Message'
import Hidden from './pages/Hidden'
import Nav from './components/Nav'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/distance" element={<Distance />} />
        <Route path="/present" element={<Present />} />
        <Route path="/message" element={<Message />} />
        <Route path="/secret-garden" element={<Hidden />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
