import './App.css';
import {Routes, Route, useNavigation, useNavigate} from 'react-router-dom';
import Register from './pages/Resister';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
function App() {
  const navigate= useNavigate();
  const storeData = localStorage.getItem('userData');
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/chat' element={storeData?<ChatPage/>:navigate("/login")} />
      </Routes>
    </>
 
  );
}

export default App;
