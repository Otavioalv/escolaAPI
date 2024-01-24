import styles from './styles/DatasUserTable.module.css';
import ContainerCard from './containers/ContainerCard';

export default function DatasUserTable<T extends Record<string, unknown>>({datas, title}: {datas: T[], title:string}) {

    return (
        <>
            <ContainerCard>
                <h1>{title}</h1>
                    {datas.map((datasObject, index) => (
                        <div key={index} className={styles.datasUserTable}>
                            <table className={styles.datasUserTable__table}>
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
                            </table>
                        </div>  
                    ))}
           </ContainerCard> 
        </>
    )
}