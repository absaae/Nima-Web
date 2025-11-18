import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Directorio from './pages/Directorio';
import CentrosApoyo from './pages/CentrosApoyo';
import Recursos from './pages/Recursos';
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directorio" element={<Directorio />} />
          <Route path="/centrosapoyo" element={<CentrosApoyo />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;