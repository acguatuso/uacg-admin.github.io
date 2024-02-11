import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'; // Importa Provider desde react-redux
import store from './redux/store.ts'; // Importa el store de Redux
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateAccountForm from './components/CreateAccForm.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> {/* Envuelve el componente Router(todos los componentes) con Provider y pasa el store */}
      <Router>
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/crear-cuenta" element={<CreateAccountForm />} />
          {/* Otras rutas */}
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
)
