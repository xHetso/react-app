import { useRef, useEffect, useState, useMemo } from 'react';
import LevelMap from '../../assets/background.svg';
import CoinImage from '../../assets/point.svg';
import gemPath from "../../assets/gem.svg";
import chip from "../../assets/chip.svg";
import ChampiImage from '../../assets/champi.svg';
import WalletComponent from '../../components/WalletBalance/WalletBalance';
import styles from './Education.module.css';

const POINTS = [
    { x: 240, y: 170 }, { x: 230, y: 200 }, { x: 225, y: 225 },
    { x: 225, y: 255 }, { x: 240, y: 310 }, { x: 230, y: 285 },
    { x: 319, y: 393 }, { x: 350, y: 420 }, { x: 365, y: 450 },
    { x: 360, y: 500 }, { x: 340, y: 550 }, { x: 310, y: 570 },
    { x: 280, y: 580 }, { x: 160, y: 610 }, { x: 130, y: 611 },
    { x: 100, y: 612 }, { x: 70, y: 620 }, { x: 50, y: 650 },
    { x: 70, y: 680 }, { x: 190, y: 735 }, { x: 230, y: 760 },
    { x: 270, y: 790 }, { x: 300, y: 820 }, { x: 320, y: 850 },
    { x: 330, y: 875 }, { x: 310, y: 940 }, { x: 300, y: 970 },
    { x: 280, y: 1000 }, { x: 200, y: 1030 }, { x: 170, y: 1040 },
    { x: 70, y: 1075 }, { x: 50, y: 1105 }, { x: 30, y: 1140 },
    { x: 20, y: 1180 }, { x: 20, y: 1220 }, { x: 20, y: 1260 },
    { x: 20, y: 1290 }, { x: 30, y: 1320 }, { x: 30, y: 1400 },
    { x: 40, y: 1430 }, { x: 50, y: 1460 }, { x: 70, y: 1490 },
    { x: 100, y: 1520 }, { x: 130, y: 1530 }, { x: 170, y: 1531 },
    { x: 210, y: 1532 },
];

const COINS = [
    { x: 10, y: 1350 }, { x: 90, y: 1050 }, { x: 300, y: 900 },
    { x: 90, y: 710 }, { x: 200, y: 590 }, { x: 245, y: 351 },
];

const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
    });
};

const Education = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [champi, setChampi] = useState({ x: 250, y: 1470 });

    const getOffsetX = () => (window.innerWidth - 375) / 2;

    const draw = useMemo(() => {
        return (ctx: CanvasRenderingContext2D, mapImage: HTMLImageElement, coinImage: HTMLImageElement, champiImage: HTMLImageElement) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            const offsetX = getOffsetX();
            ctx.drawImage(mapImage, -750 + offsetX, 0, 1600, 1600);

            POINTS.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x + offsetX, point.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#373D32';
                ctx.fill();
            });

            COINS.forEach((coin, i) => {
                ctx.drawImage(coinImage, coin.x - 10 + offsetX, coin.y - 10, 66, 30);
                ctx.font = '20px Montserrat';
                ctx.fillStyle = '#000000';
                ctx.fillText(String(i + 2), coin.x + 18, coin.y + 10);
            });

            ctx.drawImage(champiImage, champi.x, champi.y, 82, 83);
        };
    }, [champi]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = 1659;

                Promise.all([
                    loadImage(LevelMap),
                    loadImage(CoinImage),
                    loadImage(ChampiImage),
                ]).then(([mapImage, coinImage, champiImage]) => {
                    draw(ctx, mapImage, coinImage, champiImage);
                }).catch(err => {
                    console.error('Ошибка загрузки изображения:', err);
                });
            }
        }
    }, [draw]);

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const offsetX = getOffsetX();

            const clickedCoin = COINS.find(coin => {
                const distanceSq = (x - (coin.x + offsetX)) ** 2 + (y - coin.y) ** 2;
                return distanceSq < 33 ** 2;
            });

            if (clickedCoin) {
                console.log(`Монета нажата по координатам: (${clickedCoin.x}, ${clickedCoin.y})`);
                setChampi({ x: clickedCoin.x - 41 + offsetX, y: clickedCoin.y - 41 });
            } else {
                POINTS.forEach(point => {
                    const distanceSq = (x - (point.x + offsetX)) ** 2 + (y - point.y) ** 2;
                    if (distanceSq < 6 ** 2) {
                        console.log(`Координаты точки: (${point.x}, ${point.y})`);
                    }
                });
            }
        }
    };

    return (
        <>
            <div className={styles.wallet}>
                <div>
                    <WalletComponent icon={gemPath} value={14697} textColor="#E895FF" />
                </div>
                <div>
                    <WalletComponent icon={chip} value={20} textColor="#EEC242" />
                </div>
            </div>

            <canvas className={styles.canvas} ref={canvasRef} onClick={handleClick} />
        </>
    );
};

export default Education;
