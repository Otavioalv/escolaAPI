import { useState } from "react"
import styles from './styles/HanddleButton.module.css';
import ContainerCard from "../containers/ContainerCard";

export default function HanddleButton({onClick, firstValue, lastValue}: {onClick: (value:boolean) => void, firstValue: string, lastValue: string}) {
    
    const [checked, setChecked] = useState<boolean>(true);

    return (
        <ContainerCard>
            <ul className={styles.handdleButton}>
                {/* <li><button onClick={() => onClick(true)}>{firstValue}</button></li>
                <li><button onClick={() => onClick(false)}>{lastValue}</button></li> */}

                <li>
                    <input type="radio" onClick={() => onClick(true)} id="inputHanddle1" name="inputHanddle" checked={checked} onChange={() => (setChecked(true))}/>
                    <label htmlFor="inputHanddle1" onChange={() => (setChecked(true))}>{firstValue}</label>
                </li>
                <li>
                    <input type="radio"  onClick={() => onClick(false)} id="inputHanddle2" name="inputHanddle" checked={!checked} onChange={() => (setChecked(false))}/>
                    <label htmlFor="inputHanddle2" onChange={() => (setChecked(false))}>{lastValue}</label>
                </li>
            </ul>
       </ContainerCard>
    )
}