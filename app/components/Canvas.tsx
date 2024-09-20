"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface StampPosition {
	x: number;
	y: number;
	id: number;
}

const ImageStampCanvas: React.FC = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [stamps, setStamps] = useState<StampPosition[]>([]);
	const canvasRef = useRef<HTMLDivElement>(null);
	const imageSize = { width: 50, height: 50 };

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			if (canvasRef.current) {
				const rect = canvasRef.current.getBoundingClientRect();
				setMousePosition({
					x: event.clientX - rect.left - imageSize.width / 2,
					y: event.clientY - rect.top - imageSize.height / 2,
				});
			}
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			const newStamp: StampPosition = {
				x: event.clientX - rect.left - imageSize.width / 2,
				y: event.clientY - rect.top - imageSize.height / 2,
				id: Date.now(),
			};
			setStamps((prevStamps) => [...prevStamps, newStamp]);
		}
	};

	return (
		<div
			ref={canvasRef}
			style={{
				position: "relative",
				width: "100%",
				minHeight: "200vh",
				cursor: "none",
			}}
			onClick={handleCanvasClick}
		>
			{stamps.map((stamp) => (
				<Image
					key={stamp.id}
					src="/star.png"
					alt="Stamped Star"
					width={imageSize.width}
					height={imageSize.height}
					style={{
						position: "absolute",
						left: `${stamp.x}px`,
						top: `${stamp.y}px`,
						pointerEvents: "none",
					}}
				/>
			))}
			<Image
				src="/star.png"
				alt="Movable Star"
				width={imageSize.width}
				height={imageSize.height}
				style={{
					position: "fixed",
					left: `${mousePosition.x}px`,
					top: `${mousePosition.y}px`,
					opacity: 0.5,
					pointerEvents: "none",
				}}
			/>
		</div>
	);
};

export default ImageStampCanvas;
