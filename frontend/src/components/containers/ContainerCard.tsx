import styles from './styles/ContainerCard.module.css'
import { ContainerProps } from "../../props/containerProps";

const ContainerCard: React.FC<ContainerProps> = ({children}) => {
    return <div className={styles.containerCard}>{children}</div>
}



export default ContainerCard;