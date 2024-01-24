import { Outlet } from 'react-router-dom';
import Container from './components/containers/Container';
import Footer from './components/layout/Footer';
import Message from './components/layout/Message';

export default function App() {
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
