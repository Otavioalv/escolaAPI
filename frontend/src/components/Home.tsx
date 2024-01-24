import { FaFacebook, FaInstagram } from 'react-icons/fa';
import styles from './styles/Home.module.css';

export default function Home() {
    return(
        <>
            <div className={styles.home}>
                {/* <div className={styles.fillDiv}>

                </div> */}
                <section className={styles.about}>
                    
                    <div className={styles.about_images}>
                        <div><img src="https://via.placeholder.com/700" alt="imagem_escola" /></div>
                        <div><img src="https://via.placeholder.com/700" alt="imagem_escola" /></div>
                        <div><img src="https://via.placeholder.com/700" alt="imagem_escola" /></div>
                    </div>

                    <div className={styles.fillDiv}></div>

                    <div className={styles.about_logo}>

                        <h1>Nome escola ficticia</h1>
                        
                        <div>
                            <img src="https://via.placeholder.com/150" alt="logo" />
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
                        </div>

                        <div className={styles.about_logo_social}>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                <section className={styles.endereco}>

                    <div className={styles.endereco_list}>
                        <h4>Endereço</h4>
                        <ul>
                            <p>Escola Presencial de Tecnologia 456, Avenida da Inovação Bairro Tecnológico Cidade Progresso Estado da Tecnologia CEP: 98765-432</p>
                        </ul>
                    </div>
                    

                    <div className={styles.endereco_sociais}>
                        <h4>Redes Sociais</h4>
                        <ul>
                            <li>
                                <a href=""><FaFacebook color="blue"/></a>
                            </li>
                            <li>
                                <a href=""><FaInstagram color="purple"/></a>
                            </li>
                        </ul>
                    </div>
                    
                </section>

                <section className={styles.aboutPlus}>
                    <h4>Sobre</h4>

                    <div>
                        <p>Valorizamos a interação e a colaboração entre os alunos. Oferecemos oportunidades para trabalhar em equipes, participar de projetos conjuntos e compartilhar conhecimentos, criando um ambiente estimulante e propício ao crescimento profissional.</p>
                    </div>
                </section>
            </div>
        </>
    ) 
}