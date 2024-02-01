import styles from './styles/DatasUserTable.module.css';
import ContainerCard from './containers/ContainerCard';
import { useEffect, useState } from 'react';

export default function DatasUserTable<T extends Record<string, unknown>>({datas, title}: {datas: T[], title:string}) {

    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 600);
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            <ContainerCard>
                <h1>{title}</h1>
                    {datas.map((datasObject, index) => (
                        <div key={index} className={styles.datasUserTable}>
                            <table className={styles.datasUserTable__table}>
                                {isSmallScreen ? (
                                    <tbody>
                                        {Object.entries(datasObject).map(([key, value], index) => (
                                            <tr key={index}>
                                                <th>{key}</th>
                                                <td>{value as string}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ):(
                                    <tbody>
                                        <tr>
                                            {Object.keys(datasObject).map((keys, index) => (
                                                <th key={index}>{keys}</th>
                                            ))}
                                        </tr>

                                        <tr>
                                            {Object.values(datasObject).map((values, index) => (
                                                <td key={index}>{values as number}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>  
                    ))}
           </ContainerCard> 
        </>
    )
}