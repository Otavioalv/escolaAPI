import { Outlet } from "react-router-dom";
import styles from './styles/Page.module.css';
import NavBarUser, { navbarDatas } from "../../layout/NavBarUser";

export default function UserPage({navBar} : {navBar?: navbarDatas}) {

    return (
        <>  
            <NavBarUser datas={navBar ?? {}}/>
            <section className={styles.Page}>
                <Outlet/>
            </section>
        </>
    )
}