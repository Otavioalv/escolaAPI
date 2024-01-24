import styles from './styles/Footer.module.css';

export default function Footer() {
    const nowDate:Date = new Date();

    return (
        <footer className={styles.footer}>
            <p>&copy; {nowDate.getFullYear()} Copyright - <a href="https://l1nq.com/otavio-gabriel" target='_blank'>https://l1nq.com/otavio-gabriel</a></p>
        </footer>
    )
}