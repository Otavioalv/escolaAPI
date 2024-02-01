import style from './styles/Page404.module.css';
import { FaExclamationCircle } from "react-icons/fa";

export default function Page404() {
    return(
        <div className={style.page404}>
            <h1>Pagina não encontrada</h1>
            <FaExclamationCircle/>
            <h3>404</h3>
        </div>
    )
}