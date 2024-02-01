import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Container from './components/containers/Container';
import Footer from './components/layout/Footer';
import Message from './components/layout/Message';
import { useEffect } from 'react';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === '/' ? navigate('/home') : null;
    return; 
  }, [location, navigate]);



  return (
    <>
        <Container>
          <Outlet/>
          <Message/>
        </Container>
        <Footer/>
    </>
  )
}
