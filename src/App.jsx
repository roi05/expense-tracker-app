import './App.css';
import NavBar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import { useUserContext } from './hooks/useUserContext';
import { Navigate } from 'react-router-dom';

function App() {
  const { user } = useUserContext();

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path='/'
            element={user ? <Home /> : <Navigate to='/login' />}
          />
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/' />}
          />
          <Route
            path='/signup'
            element={!user ? <Signup /> : <Navigate to='/' />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
