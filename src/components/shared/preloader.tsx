import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface PreloaderProps {
  className?: string;
}

export const Preloader = ({ className }: PreloaderProps) => {
  return (
    <div
      className={cn("min-h-[80vh] flex justify-center items-center", className)}
    >
      <Loader className="animate-spin text-background" />
    </div>
  );
};
