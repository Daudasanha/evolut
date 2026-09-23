import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'

import Dashboard from './pages/Dashboard/Dashboard'
import Alimentacao from './pages/Alimentacao/Alimentacao'
import Agua from './pages/Agua/Agua'
import Treino from './pages/Treino/Treino'
import Evolucao from './pages/Evolucao/Evolucao'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alimentacao" element={<Alimentacao />} />
          <Route path="/agua" element={<Agua />} />
          <Route path="/treino" element={<Treino />} />
          <Route path="/evolucao" element={<Evolucao />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App