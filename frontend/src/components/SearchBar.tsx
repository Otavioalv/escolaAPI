import { FormEvent, useState } from 'react';
import styles from './styles/SearchBar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6'


export default function SearchBar({handle, placeholder="Buscar..."}: {handle: (id: string) => void, placeholder: string}) {
    
    const [inputSearch, setInputSearch] = useState<string>('');

    async function handleOnInputSearch(e: FormEvent<HTMLInputElement>) {
        const element = e.target as HTMLInputElement;
        
        setInputSearch(element.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'));
    }

    return (
        <div id="divBusca" className={styles.searchBar}>
            <input type="text" placeholder={placeholder} onInput={handleOnInputSearch} value={inputSearch}/>
            <button id="btnBusca" onClick={() => handle(inputSearch)}><FaMagnifyingGlass/></button>
        </div>
    )
}