import styles from './styles/NavBarUser.module.css';

import ContainerNavBar from "../containers/ContainerNavBar";

import { deleteToken } from '../../helper/token';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';


export type navbarDatas = Record<string, string | Record<string, string>>;


// const navBarAdmin:navbarDatas = {
//     admin: '/admin',
//     alunos: '/admin/alunos',
//     professores: '/admin/professores',
//     cursos: '/admin/cursos',
    
//     registrar: {
//       admin: '/admin/register',
//       ussuario: '/admin/register-user',
//       curso: '/admin/curso/registrar',
//     }
    
// }

// Object.entries(navBarAdmin).map((value, index) => {
    
//     console.log(index, value, 'string');
    
//     if(typeof value[1] === 'object') {
//         Object.entries(value[1]).map((value, index) => {
            
//             console.log(index, value, 'object');
        
//         });
//     }
// });


export default function NavBarUser({datas} : {datas: navbarDatas}) {

    const datasArr = Object.entries(datas ?? {});
    
    const navigate = useNavigate();
    const location = useLocation();

    async function handleLogout() {
        await deleteToken();
        navigate('/home');
    }

    return (
        <ContainerNavBar>
            <ul className={styles.navBar}>

                <li><a href="/home"><img src="https://via.placeholder.com/100" alt="logo" /></a></li>

                {datas && (
                    <ul className={styles.navBar__link}>
                        {datasArr.map((value, indexA) => (
                            <React.Fragment key={indexA}>
                                {typeof value[1] === 'string' && 
                                    <li>
                                        <a href={value[1]} className={location.pathname === value[1] ? styles.styledLine : ''}>
                                            {value[0].charAt(0).toUpperCase() + value[0].slice(1).replace(/_/g, ' ')}
                                        </a>
                                    </li>
                                }

                                {typeof value[1] === 'object' && 
                                    <li className={styles.navBar_options}>
                                        <button>{value[0]}</button>
                                        <div>
                                            <ul>
                                                {Object.entries(value[1]).map((valueObj, indexB) => (
                                                    <li key={indexB}>
                                                        <a href={valueObj[1]} className={location.pathname === valueObj[1] ? styles.styledLine : ''}>
                                                            {valueObj[0]}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                }
                            </React.Fragment>
                        ))}
                    </ul>
                )}

                <li className={styles.navBar_logout}>
                    <button onClick={handleLogout}>LOGOUT</button>
                </li>
            </ul>
        </ContainerNavBar>
    )
}
