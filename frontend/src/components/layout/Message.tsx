import { useState } from 'react';
import styles from './styles/Message.module.css';
import { ListResponseProps } from '../../props/responseProps';
import { getMessage } from '../../helper/messagePage';

export default function Message() {
    
    // const borderColor = 'border-blue';

    const [visible, setVisible] = useState<boolean>(false);
    const [borderColor, setBorderColor] = useState<string>('border-blue');
    const [messageResponse, setMessageResponse] = useState<ListResponseProps>({});

    window.addEventListener('functionCalled', async () => {
        await handleMessage();
        await handdleVisible();
        await handleSetColor();
    });

    async function handleMessage() {
        setMessageResponse(await getMessage());
    }

    async function handdleVisible() {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            clearTimeout(timer)
        }, 7000);
    }

    async function handleSetColor() {
        const message:ListResponseProps = await getMessage();
        const status:number = message.status ?? 200;
        
        switch(status) {
            case 200: 
            case 201:   
                setBorderColor('border-green');
                break;
            case 400:
            case 401:
            case 402:
            case 403:
                setBorderColor('border-yellow');
                break;
            case 404:
            case 500: 
                setBorderColor('border-red');
                break;
            default: 
                setBorderColor('border-red');
        }
    }
    
    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[borderColor]}`}>
                    <h1>{messageResponse.message}</h1>
                    <h2>status: {messageResponse.status}</h2>
                </div>
            )}
        </>
    )
}