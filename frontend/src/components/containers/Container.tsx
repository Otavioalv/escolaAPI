import React from 'react';
import styles from './styles/Container.module.css';
import { ContainerProps } from '../../props/containerProps';


const Container: React.FC<ContainerProps> = ({children}) => {
    return <div className={styles.container}>{children}</div>
}

export default Container;