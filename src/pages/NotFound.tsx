import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
          <DotLottieReact
                                src="https://lottie.host/ee72df6e-7258-420f-9130-2539fa06ee6e/bjsBEs5pjE.lottie"
                                loop
                                autoplay
                                className="w-32 h-32 items-center" // Atur ukuran sesuai kebutuhan
                              />
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
