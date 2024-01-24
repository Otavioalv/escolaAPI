import { Outlet } from "react-router-dom";
import NavBarHome from "../../layout/NavBarHome";
import styles from './styles/Page.module.css';

export default function InitialPage() {
    return (
        <>
            <NavBarHome/>
            <section className={styles.Page}>
                <Outlet/>
            </section>
        </>
    )
}