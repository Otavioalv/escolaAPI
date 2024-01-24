import { Outlet } from "react-router-dom";
import styles from './styles/Page.module.css';
import NavBarUser from "../../layout/NavBarUser";

export default function UserPage({navBar} : {navBar?: Record<string, string>}) {

    return (
        <>  
            <NavBarUser datas={navBar}/>
            <section className={styles.Page}>
                <Outlet/>
            </section>
        </>
    )
}