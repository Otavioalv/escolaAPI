import styles from './styles/ContainerNavBar.module.css';
import { ContainerProps } from "../../props/containerProps";


const ContainerNavBar: React.FC<ContainerProps> = ({children}) => {
    return <nav className={styles.container}>{children}</nav>
}

export default ContainerNavBar;