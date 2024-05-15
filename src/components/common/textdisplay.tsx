import React, { useEffect, useRef, useState } from 'react';
import { Loader } from './loader';
import { MdContentCopy } from 'react-icons/md';
import { Socket, io } from 'socket.io-client';
import { statusPositionResponse } from '@/app.interface';

interface TextDisplayProps {
    token: string;
    onPositionChange: (position: number) => void;
}

export function TextDisplay(props: TextDisplayProps) {
    const [position, setPosition] = useState(9999);
    const [contentText, setContentText] = useState("");
    const [queueText, setQueueText] = useState("");
    const contentTextRef = useRef<string>("");
    const socketUrl = process.env.NEXT_PUBLIC_API_KEY || "http://localhost:80";
    const socket: Socket = io(socketUrl);

    useEffect(() => {
        socket.on('queue_update', (data: statusPositionResponse) => {
            if (data.message === 'GOOD') {
                setPosition(-1);
                setContentText(data.content.toString());
                contentTextRef.current = data.content.toString();
                setQueueText('Сгенерированный текст вакансии:');
                showNotification('Один из ваших текстов готов');
                setTimeout(() => {
                    socket.disconnect();
                }, 0);
            } else if (data.message === 'OK') {
                const newPos = Number(data.content);
                setPosition(newPos);
                if (newPos > 0) {
                    setQueueText(`Ваш запрос ${newPos} в очереди`)
                } else {
                    setQueueText('Прямо сейчас обрабатываем, осталось чуть-чуть')
                }
            } else {
                setQueueText('К сожалению ваш запрос был утерян, попробуйте повторить попытку генерации');
                setPosition(-1);
            }
        })
        socket.on('disconnect', () => {
            setPosition(-1);
            if (contentTextRef.current == "") {
                setQueueText('Произошла непредвиденная ошибка, попробуйте повторить снова')
            }
        }) 
        socket.connect()
        socket.emit('user_connect', {token: props.token})
        
        return () => {
            socket.disconnect();
        }
    }, [])

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
