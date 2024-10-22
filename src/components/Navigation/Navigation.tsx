import { NavButton } from "../NavButton/NavButton";
import styles from "./Navigation.module.css";
import mainIcon from "../../assets/main.svg";
import wizIcon from "../../assets/wiz.svg";
import educationIcon from "../../assets/education.svg";
import profileIcon from "../../assets/profile.svg";


const navItems = [
    { to: "/main", src: mainIcon, alt: "Главная", label: "Главная" },
    { to: "/wiz", src: wizIcon, alt: "Wiz", label: "Wiz" },
    { to: "/", src: educationIcon, alt: "Обучение", label: "ED" },
    { to: "/profile", src: profileIcon, alt: "Профиль", label: "Профиль" }
];

export function Navigation() {
    return (
        <div className={styles.navContainer}>
            {navItems.map((item) => (
                <NavButton key={item.to} to={item.to} src={item.src} alt={item.alt} label={item.label} />
            ))}
        </div>
    );
}
