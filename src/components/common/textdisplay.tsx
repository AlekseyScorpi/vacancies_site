import React, { useEffect, useState } from 'react';
import { Loader } from './loader';
import { statusRequest } from '@/api';

interface TextDisplayProps {
    token: string;
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
                        setQueueText('Сгенерированный текст вакансии:')
                        clearInterval(interval)
                    } else if (data.message === 'OK') {
                        const newPos = Number(data.content)
                        setPosition(newPos)
                        if (newPos > 0) {
                            setQueueText(`Ваш запрос ${newPos} в очереди`)
                        } else {
                            setQueueText('Прямо сейчас обрабатываем, осталось чуть-чуть')
                        }
                    }
                } else {
                    console.error('Произошла ошибка при отправке запроса:', response.data.content);
                }
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []); 

    return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-4 mx-8 relative">
            <p className='{absoulute inset-0 flex items-center justify-center}'>{queueText}</p>
            <div className={`absolute inset-0 flex items-center justify-center ${position >= 0 ? 'block' : 'hidden'}`}>
                <Loader/>
            </div>
            <p className="text-gray-800 text-lg">{contentText}</p>
        </div>
    );
}
