// src/components/GlobalLoading.tsx
import { useIsFetching } from '@tanstack/react-query';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';

const GlobalLoading = () => {
    const isFetching = useIsFetching();

    if (isFetching <= 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <DotLottieReact
                src="https://lottie.host/8ac7a7f8-9e01-4e19-82c4-7381d9fc3218/D4UsU6eeiC.lottie"
                loop
                autoplay
                style={{ width: 120, height: 120 }}
            />
        </div>
    );
};

export default GlobalLoading;