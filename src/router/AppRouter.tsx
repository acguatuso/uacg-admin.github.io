import { Route, Routes } from 'react-router-dom';
import App from '../App';
import LoginAccountForm from '../components/gestion_usuarios/LoginAccForm';
import CreateAccountForm from '../components/gestion_usuarios/CreateAccForm';

export const AppRouter = () => {
  return (
    <>
    
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/iniciar-sesion" element={<LoginAccountForm />} />
          <Route path="/crear-cuenta" element={<CreateAccountForm />} />
          {/* Otras rutas */}
        </Routes>
    
    </>
  )
}
