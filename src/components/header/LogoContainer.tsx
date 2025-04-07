import { Link } from "react-router";

interface LogoContainerProps {
    icon?: React.ReactNode;
    label: string;
}

export const LogoContainer = ({icon, label}: LogoContainerProps) => {
    return (
        <Link to={"/"} className="flex items-center gap-2 leading-0">
            <span className="text-primary leading-0">{icon}</span>
            <h3 className="text-xl mt-2 font-bold leading-0 font-parkinsans">{label}</h3>
        </Link>
    )
}