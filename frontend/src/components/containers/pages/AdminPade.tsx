import { Outlet } from "react-router-dom";
import styles from './styles/Page.module.css';
import NavBarUser from "../../layout/NavBarUser";

export default function AdminPage() {
    return (
        <>  
            <NavBarUser/>
            <section className={styles.Page}>
                <Outlet/>
            </section>
        </>
    )
}