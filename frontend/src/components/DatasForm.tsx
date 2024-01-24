import styles from './styles/DatasForm.module.css';

import React, { FormEvent, createElement, useState } from "react";
import ContainerCard from "./containers/ContainerCard";
import { FormDatasProps } from "../props/formProps";
import { IconType } from "react-icons";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

export default function DatasForm({datas, title, handleSubmit}: FormDatasProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [inputDateType, setInputDateType] = useState<string>('text');
    const [selectData, setSelectData] = useState<string | null>(null);

    const datasObject = Object.entries(datas);    

    async function toogleShowPassword() {
        setShowPassword(!showPassword);
    }

    const handleDateTypeFocus = () => {
        setInputDateType('date');
    }

    const handleDateTypeBlur = () => {
        setInputDateType('text');
    }

    const handleSelectValue = (e:FormEvent<HTMLSelectElement>) => {
        const selectElement = e.target as HTMLSelectElement;
        const value:string = selectElement.value;

        setSelectData(value);
    }

    // console.log(datas);
    // datasObject.map((datasArr) => {
    //     Object.entries(datasArr[1]).map((datasValues) => {
    //         if(datasArr[1].type === 'select') {
    //             Object.entries(datasArr[1].valuesSelect ?? {}).map((selectDatas, _) => {
    //                 console.log('===========================================');
    //                 console.log("SELECT DATAS: ", selectDatas, datasValues);
    //                 if(selectDatas[1] === datasValues[1]) {
    //                     console.log('Igual-++++++++++++++++++: ', selectDatas[1], datasValues[1]);
    //                 } 
    //                 else {
    //                     console.log('Inigual: ', selectDatas[1], datasValues[1]);
    //                 }
    //                 console.log('===========================================');
    //             })
    //         }
    //     });
    // });

    return (
        <>
            <ContainerCard>
                <div className={styles.datasForm}>
                    <form onSubmit={handleSubmit} className={styles.datasForm__form}>
                        <h1>{title}</h1>
                        <div  className={styles.datasForm__form__Container}>
                        {datasObject.map((datasArr, indexArr) => (
                                <React.Fragment key={indexArr}>
                                    <div>
                                        {Object.entries(datasArr[1]).map((datasValues, indexVal) => (
                                            <React.Fragment key={indexVal}>
                                                {
                                                    datasValues[0] === 'value' && (
                                                        <> 
                                                            {datasArr[1].type === 'text' && (
                                                                <>
                                                                    <label htmlFor={datasArr[0]}>{datasArr[0].replace(/_/g, " ").toLowerCase()}</label>
                                                                    <input 
                                                                        type={datasArr[1].type}
                                                                        name={datasArr[0]}
                                                                        id={datasArr[0]}
                                                                        placeholder={datasArr[0].charAt(0).toUpperCase() + datasArr[0].slice(1).replace(/_/g, " ")}
                                                                        autoComplete={`current-${datasArr[0]}`}
                                                                        ref={datasArr[1].refInput}
                                                                        defaultValue={datasValues[1]}
                                                                        disabled={datasArr[1].disabled}
                                                                    />
                                                                </>
                                                            )}
                                                            
                                                            {datasArr[1].type === 'number' && (
                                                                <>
                                                                    <label htmlFor={datasArr[0]}>{datasArr[0].replace(/_/g, " ").toLowerCase()}</label>
                                                                    <input 
                                                                        type={datasArr[1].type}
                                                                        name={datasArr[0]}
                                                                        id={datasArr[0]}
                                                                        placeholder={datasArr[0].charAt(0).toUpperCase() + datasArr[0].slice(1).replace(/_/g, " ")}
                                                                        autoComplete={`current-${datasArr[0]}`}
                                                                        ref={datasArr[1].refInput}
                                                                        defaultValue={datasValues[1]}
                                                                        disabled={datasArr[1].disabled}
                                                                        step='any'
                                                                    />
                                                                </>
                                                            )}

                                                            {datasArr[1].type === 'date' && (
                                                                <>
                                                                    <label htmlFor={datasArr[0]}>{datasArr[0].replace(/_/g, " ").toLowerCase()}</label>
                                                                    <input 
                                                                        type={inputDateType}
                                                                        onFocus={handleDateTypeFocus}
                                                                        onBlur={handleDateTypeBlur}
                                                                        name={datasArr[0]}
                                                                        id={datasArr[0]}
                                                                        placeholder={datasArr[0].charAt(0).toUpperCase() + datasArr[0].slice(1).replace(/_/g, " ")}
                                                                        autoComplete={`current-${datasArr[0]}`}
                                                                        ref={datasArr[1].refInput}
                                                                        defaultValue={inputDateType === 'text' ? (datasValues[1].substring(8, 10) + datasValues[1].substring(4, 7) + datasValues[1].substring(4, 5) + datasValues[1].substring(0, 4) ).replace(/-/g, '/') : datasValues[1].substring(0, 10)}
                                                                        disabled={datasArr[1].disabled}
                                                                    />
                                                                </>
                                                                /* datasValues[1].substring(0, 10).replace(/-/g, '/') */
                                                            )}

                                                            
                                                            {datasArr[1].type === 'hidden' && (
                                                                <>
                                                                    <input 
                                                                        type="hidden" 
                                                                        name={datasArr[0]}
                                                                        id={datasArr[0]}
                                                                        ref={datasArr[1].refInput}
                                                                        disabled={datasArr[1].disabled}
                                                                        defaultValue={datasValues[1]}/>
                                                                </>
                                                            )}

                                                            {datasArr[1].type === 'password' && (
                                                                <>
                                                                    <label htmlFor={datasArr[0]}>{datasArr[0].replace(/_/g, " ").toLowerCase()}</label>
                                                                    <input 
                                                                        type={showPassword ? 'text' : 'password'}
                                                                        name={datasArr[0]}
                                                                        id={datasArr[0]}
                                                                        placeholder={datasArr[0].charAt(0).toUpperCase() + datasArr[0].slice(1).replace(/_/g, " ")}
                                                                        autoComplete={`current-${datasArr[0]}`}
                                                                        ref={datasArr[1].refInput}
                                                                        disabled={datasArr[1].disabled}
                                                                    />
                                                                    {showPassword ? (
                                                                        <label htmlFor={datasArr[0]}><FaRegEye onClick={toogleShowPassword}/></label>
                                                                    ) : (
                                                                        <label htmlFor={datasArr[0]}><FaRegEyeSlash onClick={toogleShowPassword}/></label>
                                                                    )}

                                                                
                                                                </>
                                                            )}

                                                            {datasArr[1].type === 'select' && (
                                                                <>
                                                                    <label htmlFor={datasArr[0]}>{datasArr[0].replace(/_/g, " ").toLowerCase()}</label>
                                                                    <select name={datasArr[0]} id={datasArr[0]} disabled={datasArr[1].disabled} ref={datasArr[1].refSelect} value={selectData || Object.entries(datasArr[1].valuesSelect ?? {}).find((value) => value[1] === datasValues[1])?.[0]} onChange={handleSelectValue}> 
                                                                        {Object.entries(datasArr[1].valuesSelect ?? {}).map((selectDatas, indexSD) => (
                                                                            selectDatas[1] !== datasValues[1] ? (
                                                                            <option value={selectDatas[0]} key={indexSD} id={`${selectDatas[0]}_${selectDatas[1]}`}>{selectDatas[1]}</option>
                                                                        ) : (
                                                                            <option value={selectDatas[0]} key={indexSD} id={`${selectDatas[0]}_${selectDatas[1]}`}>{selectDatas[1]}</option>
                                                                        )))}
                                                                    </select>
                                                                </>
                                                            )}
                                                        </>
                                                    )  
                                                
                                                }

                                                {datasValues[0] === 'icon' && datasArr[1].type !== 'password' && (
                                                    <label htmlFor={datasArr[0]}>{createElement(datasValues[1] as IconType, {key: indexVal})}</label>
                                                )}
                                            </React.Fragment>
                                        )                               
                                        )}
                                    </div>
                                </React.Fragment>
                        ))}
                        </div>
                        
                        <input type="submit"/>
                    </form>
                </div>
            </ContainerCard>
        </>
    )
} 

