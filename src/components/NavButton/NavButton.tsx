import { Link, useLocation } from "react-router-dom";
import styles from "./NavButton.module.css";

interface NavItemProps {
    to: string;
    src: string;
    alt: string;
    label: string;
}

export function NavButton({ to, src, alt, label }: NavItemProps) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className={`${styles.navButton} ${isActive ? styles.active : ''}`}>
            <img
                src={src}
                alt={alt}
                className={isActive ? styles.activeIcon : ''}
                style={{ opacity: isActive ? 1 : 0.4 }}
            />
            <p>{label}</p>
        </Link>
    );
}