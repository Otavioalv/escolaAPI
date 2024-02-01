import styles from './styles/ContainerNavBar.module.css';
import { ContainerProps } from "../../props/containerProps";
import { useState } from 'react';


const ContainerNavBar: React.FC<ContainerProps> = ({children}) => {
    const [click, setClick] = useState<boolean>(false);

    return (
        <nav className={`${styles.container} ${click ? styles.checked : ''}`}>
            {children}

            <div className={styles.checkbox}>
                <input id={`${styles.checkbox2}`} type="checkbox" checked={click} onChange={() => (setClick(!click))}/>
                <label className={`${styles.toggle2}`} htmlFor="checkbox2" onClick={() => (setClick(!click))}>
                    <div id={`${styles.bar4}`} className={styles.bars}></div>
                    <div id={`${styles.bar5}`} className={styles.bars}></div>
                    <div id={`${styles.bar6}`} className={styles.bars}></div>
                </label>

            </div>
        </nav>
    )
}

export default ContainerNavBar;