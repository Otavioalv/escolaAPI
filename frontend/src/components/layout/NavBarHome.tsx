import ContainerNavBar from '../containers/ContainerNavBar';
import styles from './styles/NavBarHome.module.css';

export default function NavBarHome() {
    return (
        <ContainerNavBar>
            <ul className={styles.navBar}>

                <li><a href="/home"><img src="https://via.placeholder.com/100" alt="logo" /></a></li>
                
                <li className={styles.navBar_login}>
                    <button>LOGIN</button>
                    <div>
                        <ul>
                            <li><a href="/home/aluno/login">Aluno</a></li>
                            <li><a href="/home/professor/login">Professor</a></li>
                            <li><a href="/home/admin/login">Admin</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </ContainerNavBar>
    )
}