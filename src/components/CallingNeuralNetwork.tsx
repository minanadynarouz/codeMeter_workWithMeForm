'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const NeuralNetworkNodes = dynamic(() => import('@/components/NeuralNetwork'), {
    ssr: false,
});


const CallingNeuralNetwork = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="absolute inset-0 z-0 ">
            {mounted && <NeuralNetworkNodes />}
        </div>
    )
}

export default CallingNeuralNetwork