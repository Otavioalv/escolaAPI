import styles from './styles/NavBarUser.module.css';

import ContainerNavBar from "../containers/ContainerNavBar";

import { deleteToken } from '../../helper/token';
import { useNavigate } from 'react-router-dom';

export default function NavBarUser({datas} : {datas?: Record<string, string>}) {

    const datasArr = Object.entries(datas ?? {});
    
    const navigate = useNavigate();
    
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
                        {datasArr.map((value, index) => (
                            <li key={index}>
                                <a href={value[1]}>{value[0].charAt(0).toUpperCase() + value[0].slice(1).replace(/_/g, ' ')}</a>
                            </li>
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
