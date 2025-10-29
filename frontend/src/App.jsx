import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Directorio from './pages/Directorio';
import CentrosApoyo from './pages/CentrosApoyo';
import Recursos from './pages/Recursos';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Directorio" element={<Directorio />} />
          <Route path="/CentrosApoyo" element={<CentrosApoyo />} />
          <Route path="/Recursos" element={<Recursos />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;