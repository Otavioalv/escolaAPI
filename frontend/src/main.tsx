import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom' ;

// ALUNO
import ListAlunos from './routers/AdminRouters/Aluno/ListAlunos.tsx';
import EditAluno from './routers/AdminRouters/Aluno/EditAluno.tsx';

import RegisterUser from './routers/AdminRouters/RegisterUser.tsx'

// PROFESSOR
import ListProfessores from './routers/AdminRouters/Professor/ListProfessores.tsx';
import EditProfessor from './routers/AdminRouters/Professor/EditProfessor.tsx';


// CURSO
import RegisterCurso from './routers/AdminRouters/Curso/RegisterCurso.tsx';
import ListCursos from './routers/AdminRouters/Curso/ListCursos.tsx';
import EditCurso from './routers/AdminRouters/Curso/EditCurso.tsx';

// NOTAS
import EditNota from './routers/AdminRouters/Notas/EditNota.tsx';
import IndividualNota from './routers/AdminRouters/Notas/IndividualNota.tsx';

// ADMIN
import LoginAdmin from './routers/AdminRouters/LoginAdmin.tsx';
import AdminRegister from './routers/AdminRouters/Admin/AdminRegister.tsx';

import { saveTokenProps } from './props/loginProps.ts';
import { getToken } from './helper/token.ts';
import LoginAluno from './routers/AlunoRouters/LoginAluno.tsx';
import Aluno from './routers/AlunoRouters/Aluno.tsx';
import EditIndividualAluno from './routers/AlunoRouters/EditIndividualAluno.tsx';
import LoginProfessor from './routers/ProfessorRouters/LoginProfessor.tsx';
import Professor from './routers/ProfessorRouters/Professor.tsx';
import EditIndividualProfessor from './routers/ProfessorRouters/EditIndividualProfessor.tsx';
import ListAllAlunos from './routers/ProfessorRouters/ListAllAlunos.tsx';

import Home from './components/Home.tsx';

import InitialPage from './components/containers/pages/InitialPage.tsx';
import UserPage from './components/containers/pages/UserPage.tsx';
import Admin from './routers/AdminRouters/Admin.tsx';
import { navbarDatas } from './components/layout/NavBarUser.tsx';
import Page404 from './components/Page404.tsx';

const token:saveTokenProps = getToken();

const navBarAdmin:navbarDatas = {
  admin: '/admin',
  alunos: '/admin/alunos',
  professores: '/admin/professores',
  cursos: '/admin/cursos',
  registrar: {
    admin: '/admin/register',
    ussuario: '/admin/register-user',
    curso: '/admin/curso/registrar'
  },
}


const router = createBrowserRouter([
  {
    path: '/*', 
    element: <Page404/>
  },
  {
    path: "/",
    element: <App/>, 
    children: [

      {
        path: "/home",
        element: <InitialPage/>,
        children: [
          {
            path: "/home",
            element: <Home/>,
          },
          {
            path: '/home/aluno/login',
            element: <LoginAluno/>
          },
          {
            path: '/home/professor/login',
            element: <LoginProfessor/>
          },    
          {
            path: '/home/admin/login',
            element: <LoginAdmin />
          }, 
        ]
      },

      {
        path: '/aluno',
        element: <UserPage/>,
        children: [
          {
            path: '/aluno',
            element: <Aluno token={token}/>            
          },
          {
            path: '/aluno/edit',
            element: <EditIndividualAluno token={token}/>
          },
        ]
      },

      {
        path: '/professor',
        element: <UserPage/>,
        children: [
          {
            path: '/professor',
            element: <Professor token={token}/>
          },
          
          {
            path: '/professor/edit',
            element: <EditIndividualProfessor token={token}/>
          },
          {
            path: '/professor/alunos',
            element: <ListAllAlunos token={token}/>
          },
        ]
      },

      {
        path: '/admin',
        element: <UserPage navBar={navBarAdmin}/>,
        children: [
          /* ALUNO */
          {
            path: '/admin',
            element: <Admin token={token}/>
          },
          {
            path: "/admin/alunos",
            element: <ListAlunos token={token}/>,
          },
          {
            path: "/admin/aluno/edit/:cpf",
            element: <EditAluno token={token}/>
          },     
          {
            path: '/admin/aluno/nota/edit/:cpf_aluno',
            element: <EditNota token={token}/>
          },
          {
            path: '/admin/aluno/nota/:cpf_aluno',
            element: <IndividualNota token={token}/>
          },

          /* CURSO */
          {
            path: "/admin/curso/registrar",
            element: <RegisterCurso token={token}/>
          },
          {
            path: '/admin/cursos',
            element: <ListCursos token={token}/>
          },
          {
            path: '/admin/curso/edit/:id',
            element: <EditCurso token={token}/>
          },

          /* PROFESSOR */          
          {
            path: "/admin/professores",
            element: <ListProfessores token={token}/>
          },
          {
            path: "/admin/professor/edit/:cpf",
            element: <EditProfessor token={token}/>
          },

          /* REGISTER USER */
          {
            path: "/admin/register-user",
            element: <RegisterUser token={token}/>        
          },

          /* ADMIN REGISTER */
          {
            path: '/admin/register',
            element: <AdminRegister token={token}/>
          },
        ]
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
