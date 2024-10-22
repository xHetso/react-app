import { useRef, useEffect } from 'react';
import LevelMap from '../../assets/background.svg';

export function Education() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const points = [
        { x: 50, y: 100 },
        { x: 150, y: 200 },
        { x: 250, y: 300 }
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = 375;
                canvas.height = 1659;
                const image = new Image();
                image.src = LevelMap;

                const rect = canvas.getBoundingClientRect();
                console.log(`Ширина: ${rect.width}, Высота: ${rect.height}`);

                image.onload = () => {
                    ctx.drawImage(image, -750, 0, 1600, 1600);
                    points.forEach(point => {
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
                        ctx.fillStyle = 'blue';
                        ctx.fill();
                    });
                };
            }
        }
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            points.forEach(point => {
                const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
                if (distance < 10) {
                    console.log(`Координаты точки: (${point.x}, ${point.y})`);
                }
            });
        }
    };

    return <canvas ref={canvasRef} style={{ border: '1px solid black' }} onClick={handleClick} />;
}
