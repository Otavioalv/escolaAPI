import styles from './styles/Loading.module.css';

export default function Loading() {

    return (
        <div className={styles.loader__container}>
            <div className={styles.loader}></div>
        </div>
    );
}