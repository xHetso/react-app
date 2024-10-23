import WalletComponent from "../components/WalletBalance/WalletBalance"
import gemPath from "../assets/gem.svg"
import chip from "../assets/chip.svg"

export function Main() {
    return (
        <div>
            <WalletComponent icon={gemPath} value={14697} textColor="#E895FF" />

            <WalletComponent icon={chip} value={20} textColor="#EEC242" />
        </div>
    )
}