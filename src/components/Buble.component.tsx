'use client';

import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}

interface BubbleComponentProps {
  bubbleCount?: number;
  animationSpeed?: number;
  colors?: string[];
  maxRadius?: number;
  minRadius?: number;
}

export default function BubbleComponent({
  bubbleCount = 20,
  animationSpeed = 0.5,
  colors = [
    'rgba(255, 255, 255, 0.3)',
    'rgba(255, 255, 255, 0.3)',
    'rgba(255, 255, 255, 0.3)',
  ],
  maxRadius = 60,
  minRadius = 10,
}: BubbleComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createBubbles = () => {
      bubblesRef.current = [];
      for (let i = 0; i < bubbleCount; i++) {
        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * (maxRadius - minRadius) + minRadius,
          opacity: Math.random() * 0.3 + 0.1,
          vx: (Math.random() - 0.5) * animationSpeed,
          vy: (Math.random() - 0.5) * animationSpeed,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        if (bubble.x < -bubble.radius) bubble.x = canvas.width + bubble.radius;
        if (bubble.x > canvas.width + bubble.radius) bubble.x = -bubble.radius;
        if (bubble.y < -bubble.radius) bubble.y = canvas.height + bubble.radius;
        if (bubble.y > canvas.height + bubble.radius) bubble.y = -bubble.radius;

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createBubbles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createBubbles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bubbleCount, animationSpeed, colors, maxRadius, minRadius]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        minWidth: '100vw',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}
