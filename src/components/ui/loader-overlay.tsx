import Loader from "../loaders/loader";

interface LoaderOverlayProps {
  message?: string;
}

export function LoaderOverlay({ message = "Actualizando..." }: LoaderOverlayProps) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-xs">
      <Loader size="small" intent="loaderInfinity" />
      <span className="mt-2 text-sm text-muted-foreground">
        {message}
      </span>
    </div>
  );
} 