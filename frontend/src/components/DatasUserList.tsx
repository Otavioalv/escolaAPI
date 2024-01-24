import React from 'react';
import {  datasListProps } from '../props/datasUserListProps';

import ContainerCard from './containers/ContainerCard'
import styles from './styles/DatasUserList.module.css'

export default function DatasUserList({user, title, buttons, useImg = true}: datasListProps) {   

    // user.map(userObject => {
    //     Object.entries(buttons ?? {}).map((buttonArr) => {
    //         if(buttonArr[1]?.actionString) {
    //             if(buttonArr[1].actionString.substring(0, buttonArr[1].actionString.indexOf('${}'))) {
    //                 console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=');
    //                 console.log(Object.keys(userObject).indexOf('id'));
    //                 console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=');
    //             }
    //         }
    //     })
    // })

    
    return (
        <> 
            <ContainerCard>
                <h1>{title}</h1>
                {user.map((userObject, index) => (
                    <div className={styles.datasUserList} key={index}>
                        {useImg &&
                            <img src="https://via.placeholder.com/200" alt="aluno" />
                        }
                        
                        <div className={styles.datasUserList__about}>
                            <h1>{!title && userObject.nome as string}</h1>
                            <ul>
                                {
                                    Object.entries(userObject).map(([key, value], indexA) => (
                                        <li key={indexA}>{key.replace(/_/g, ' ')}: {value as string}</li>
                                    ))
                                }
                            </ul>    

                            <div className={styles.datasUserList__buttons}>
                                {buttons && (
                                    Object.entries(buttons ?? {}).map((buttonArr, index) => 
                                        <React.Fragment key={index}>
                                            {buttonArr[1]?.actionString && (
                                                <button className={styles[buttonArr[1].color as string]}>
                                                    {buttonArr[1].actionString.substring(0, buttonArr[1].actionString.indexOf('${}')) ? (
                                                        <>
                                                            {Object.keys(userObject).indexOf('id') >= 0 && (
                                                                <a href={
                                                                    buttonArr[1].actionString.substring(0, buttonArr[1].actionString.indexOf('${}')) 
                                                                    + Object.entries(userObject)[Object.keys(userObject).indexOf('id')][1]}
                                                                >
                                                                    {buttonArr[0].charAt(0).toUpperCase() + buttonArr[0].slice(1).replace(/_/g, " ")}
                                                                </a>
                                                            )} 
                                                            {Object.keys(userObject).indexOf('cpf') >= 0 && (
                                                                <a href={
                                                                    buttonArr[1].actionString.substring(0, buttonArr[1].actionString.indexOf('${}')) 
                                                                    + Object.entries(userObject)[Object.keys(userObject).indexOf('cpf')][1]}
                                                                >
                                                                    {buttonArr[0].charAt(0).toUpperCase() + buttonArr[0].slice(1).replace(/_/g, " ")}            
                                                                </a>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <a href={buttonArr[1].actionString}
                                                        >
                                                            {buttonArr[0].charAt(0).toUpperCase() + buttonArr[0].slice(1).replace(/_/g, " ")}            
                                                        </a>
                                                    )}
                                                    {/* <a 
                                                        href={
                                                            buttonArr[1].actionString.substring(0, buttonArr[1].actionString.indexOf('${}')) ? 
                                                            buttonArr[1].actionString.substring(0, buttonArr[1].actionString.indexOf('${}')) 
                                                            + Object.entries(userObject)[Object.keys(userObject).indexOf('id')][1] 
                                                            : buttonArr[1].actionString}
                                                    >
                                                        {buttonArr[0].charAt(0).toUpperCase() + buttonArr[0].slice(1).replace(/_/g, " ")}
                                                    </a> */}
                                                </button>     
                                            )}

                                            {buttonArr[1]?.actionFunction && (
                                                <button className={styles[buttonArr[1].color as string]} onClick={buttonArr[1]?.actionFunction}>
                                                    <a>
                                                        {buttonArr[0].charAt(0).toUpperCase() + buttonArr[0].slice(1).replace(/_/g, " ")}
                                                    </a>
                                                </button> 
                                            )}
                                            
                                            {buttonArr[1]?.actionDeleteAluno && (
                                                <button className={styles[buttonArr[1].color as string]} onClick={() => buttonArr[1]?.actionDeleteAluno?.(Object.entries(userObject)[Object.keys(userObject).indexOf('id_aluno')][1] as number, Object.entries(userObject)[Object.keys(userObject).indexOf('cpf')][1] as string)}>
                                                    <a>
                                                        delete   
                                                    </a>
                                                </button> 
                                            )}

                                            {buttonArr[1]?.actionDeleteProfessor && (
                                                <button className={styles[buttonArr[1].color as string]} onClick={() => buttonArr[1]?.actionDeleteProfessor?.(Object.entries(userObject)[Object.keys(userObject).indexOf('id_professor')][1] as number, Object.entries(userObject)[Object.keys(userObject).indexOf('cpf')][1] as string)}>
                                                    <a>
                                                        delete   
                                                    </a>
                                                </button> 
                                            )}

                                            {buttonArr[1]?.actionDeleteCurso && (
                                                <button className={styles[buttonArr[1].color as string]} onClick={() => buttonArr[1]?.actionDeleteCurso?.(Object.entries(userObject)[Object.keys(userObject).indexOf('id')][1] as number)}>
                                                    <a>
                                                        delete
                                                    </a>
                                                </button> 
                                            )}
                                        </React.Fragment>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ))}    
            </ContainerCard>
        </>
    )
}


/* */