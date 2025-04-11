interface GradientButtonProps {
    label: string;
    icon?: React.ReactNode
}

import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function GradientButton({label, icon}: GradientButtonProps) {
  return (
    <div className="m-10 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span>{label}</span> <span>{icon}</span>
      </HoverBorderGradient>
    </div>
  );
}

