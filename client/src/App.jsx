import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import PlaceDetail from './pages/PlaceDetail';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Feed/>} />
      <Route path="/places/:id" element={<PlaceDetail/>} />
    </Routes>
    </>
  );
}

export default App;