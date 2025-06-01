import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-[1800px] px-4", className)}>
      {children}
    </div>
  );
};
