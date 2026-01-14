// src/components/GlobalLoading.tsx
import { useIsFetching } from '@tanstack/react-query';
import React, { Suspense, lazy } from 'react';
import { Loader2 } from "lucide-react";

const DotLottieReact = lazy(() =>
    import('@lottiefiles/dotlottie-react').then((module) => ({
        default: module.DotLottieReact,
    }))
);

const GlobalLoading = () => {
    const isFetching = useIsFetching();

    if (isFetching <= 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-primary" />}>
                <DotLottieReact
                    src="https://lottie.host/8ac7a7f8-9e01-4e19-82c4-7381d9fc3218/D4UsU6eeiC.lottie"
                    loop
                    autoplay
                    style={{ width: 120, height: 120 }}
                />
            </Suspense>
        </div>
    );
};

export default GlobalLoading;