import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './telas/Home.jsx';
import Emprestimos from './telas/Emprestimos.jsx';
import Epis from './telas/Epis.jsx';
import Historico from './telas/Historico.jsx';
import Funcionarios from './telas/Funcionarios.jsx';
import "./styles/index.css"


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/funcionarios',
    element: <Funcionarios />,
  },
  {
    path: '/epis',
    element: <Epis />,
  },
  {
    path: '/emprestimos',
    element: <Emprestimos />,
  },
  {
    path: '/historico',
    element: <Historico />,
  },
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
