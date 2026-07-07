import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import PlaceDetail from './pages/PlaceDetail';
import CreatePlace from './pages/CreatePlace';
import EditPlace from './pages/EditPlace';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/pageNotFound';

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Feed />} />
        <Route path="/places/:id" element={<PlaceDetail />} />
        <Route path="/create" element={<CreatePlace />} />
        <Route path="/places/:id/edit" element={<EditPlace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;