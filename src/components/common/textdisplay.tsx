import React, { useEffect, useState } from 'react';
import { Loader } from './loader';
import { statusRequest } from '@/api';
import { MdContentCopy } from 'react-icons/md';

interface TextDisplayProps {
    token: string;
    onPositionChange: (position: number) => void;
}

export function TextDisplay(props: TextDisplayProps) {
    const [position, setPosition] = useState(9999);
    const [contentText, setContentText] = useState("");
    const [queueText, setQueueText] = useState("");

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await statusRequest(props.token);
                if (response.response.status === 200) {
                    const data = response.data;
                    if (data.message === 'GOOD') {
                        setPosition(-1);
                        setContentText(data.content.toString());
                        setQueueText('Сгенерированный текст вакансии:');
                        clearInterval(interval);
                    } else if (data.message === 'OK') {
                        const newPos = Number(data.content);
                        setPosition(newPos);
                        if (newPos > 0) {
                            setQueueText(`Ваш запрос ${newPos} в очереди`)
                        } else {
                            setQueueText('Прямо сейчас обрабатываем, осталось чуть-чуть')
                        }
                    }
                } else {
                    setQueueText(`Произошла ошибка при отправке запроса: ${response.data.content}`);
                    setPosition(-1);
                    clearInterval(interval);
                }
            } catch (error) {
                setQueueText(`Произошла ошибка: ${error}`);
                setPosition(-1);
                clearInterval(interval);
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []); 

    const showNotification = (message: string) => {
        if (Notification.permission === 'granted') {
            new Notification(message);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification(message);
                }
            });
        }
    };

    useEffect(() => {
        props.onPositionChange(position);
    }, [position, props.onPositionChange]);

    return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-4 mx-8 relative min-h-40">
            <p className="absoulute inset-0 flex items-center justify-center}">{queueText}</p>
            <div className={`absolute inset-0 flex items-center justify-center ${position >= 0 ? 'block' : 'hidden'}`}>
                <Loader/>
            </div>
            <p className="text-gray-800 text-lg">{contentText}</p>
            <div className={`absolute top-0 right-0 m-2 cursor-pointer ${position >= 0 ? 'hidden' : 'block'}`} onClick={()=>{
                navigator.clipboard.writeText(contentText);
                showNotification('Текст скопирован')
            }}>
                <MdContentCopy size={24} />
            </div>
        </div>
    );
}
