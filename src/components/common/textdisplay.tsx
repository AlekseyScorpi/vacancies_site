import React, { useState } from 'react';
import { Loader } from './loader';

interface TextDisplayProps {
    text: string;
}

export function TextDisplay(props: TextDisplayProps) {
    const [position, setPosition] = useState(9999);

    return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-4 mx-8 relative">
            <div className={"absolute inset-0 flex items-center justify-center ${position >= 0 ? 'hidden' : ''}"}>
                <Loader/>
            </div>
            <p className="text-gray-800 text-lg">{props.text}</p>
        </div>
    );
}
