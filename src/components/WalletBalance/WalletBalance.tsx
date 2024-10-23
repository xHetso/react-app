import React from 'react';
import styles from './WalletBalance.module.css';
import addButtonPath from './../../assets/add_button.svg'

interface WalletComponentProps {
    icon: string;
    value: number;
    textColor: string;
}

const WalletComponent: React.FC<WalletComponentProps> = ({ icon, value, textColor }) => {
    return (
        <div className={styles.walletContainer}>
            <div className={styles.leftSide}>
                <img src={icon} alt="currency icon" className={styles.icon} />
                <span className={styles.value} style={{ color: textColor }}>
                    {value}
                </span>
            </div>

            <div className={styles.rightSide}>
                <img src={addButtonPath} alt="plus icon" className={styles.plusIcon} />
            </div>
        </div>
    );
};


export default WalletComponent;
