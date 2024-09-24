"use client";
import React, { useState, useEffect, useRef } from "react";

interface StampPosition {
	x: number;
	y: number;
	id: number;
}

const OrganicSVGBoundedStampCanvas: React.FC = () => {
	const width = window.innerWidth - 10;
	const height = window.innerHeight - 0;
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [stamps, setStamps] = useState<StampPosition[]>([]);
	const svgRef = useRef<SVGSVGElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const imageSize = { width: 20, height: 20 };

	const bodyPath =
		"M54.79,691.35c-44.49-61.84-74.21-167.21-30-264,2.17-4.76,45.98-97.16,141-133,55.73-21.02,76-2.56,133-33,5.4-2.88,64.67-35.52,95-100,15.68-33.33,11.47-49.34,10-54-7.55-24.01-30.08-25.96-33-46-3.09-21.2,18.07-46.64,43-55,29.5-9.89,66.31,3.43,72,23,4.98,17.12-17.44,26.7-26,59-8.07,30.47,1.29,61.93,11,78,27.34,45.23,94.15,29.3,168,48,140.47,35.58,203.9,169.68,216,197,44.89,101.4,44.48,206.4,34,271-2.04,12.56-15.07,32.97-22,29-18.53-10.61-49.78-112.25-70-175-14.48-44.94-22-104-37-126-9.83-14.42-30.2-33.52-39-31-15.07,4.32-18.16,43.14-15,71,3.49,30.76,12.26,81.99,11,99-4,54,5.39,43.32-37,209-18.83,73.6-18.48,84.58-17,95,8.88,62.33,49.1,108.12,36,147-6.53,19.38-9.78,17.01-28,18-34.48,1.87-68.98-49.97-72-56-13.87-27.66-8.89-42.85-28-104-2.79-8.92.29.68-6-6-10.72-11.39-33.86-23.13-80-16-73.02,11.29-75.47,9.51-81,16-17.08,20.03-.86,40.76-10,77-13.35,52.9-70.52,98.41-97,88-29.49-11.59-21.06-66.44,7-123,5.49-11.07-7.22-61.1-16-77-5.87-10.63-88.86-141.81-100-203-28.53-156.75-30.75-192.14-45-194-20.71-2.7-47.18,68.04-57,104-5.62,20.6-14.31,53.59-10,95,8.05,77.23,55.22,125.25,48,131-5.73,4.57-41.56-20.86-69-59Z";

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			if (svgRef.current) {
				const svgRect = svgRef.current.getBoundingClientRect();
				setMousePosition({
					x: event.clientX - svgRect.left,
					y: event.clientY - svgRect.top,
				});
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const isPointInPath = (x: number, y: number): boolean => {
		if (pathRef.current) {
			const point = svgRef.current!.createSVGPoint();
			point.x = x;
			point.y = y;
			return pathRef.current.isPointInFill(point);
		}
		return false;
	};

	const handleSvgClick = (event: React.MouseEvent<SVGSVGElement>) => {
		if (svgRef.current) {
			const svgRect = svgRef.current.getBoundingClientRect();
			const x = event.clientX - svgRect.left;
			const y = event.clientY - svgRect.top;

			if (isPointInPath(x, y)) {
				const newStamp: StampPosition = {
					x: x - imageSize.width / 2,
					y: y - imageSize.height / 2,
					id: Date.now(),
				};
				setStamps((prevStamps) => [...prevStamps, newStamp]);
			}
		}
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				cursor: "none",
			}}
		>
			<svg
				viewBox={`0 0 ${width} ${height}`}
				ref={svgRef}
				// width={svgSize.width}
				// height={svgSize.height}
				onClick={handleSvgClick}
			>
				<path
					ref={pathRef}
					d={bodyPath}
					fill="none"
					stroke="#000"
					strokeWidth="2"
				/>
				{/* <clipPath id="organic-bounds">
					<path d={bodyPath} />
				</clipPath> */}
				<g clipPath="url(#organic-bounds)">
					{stamps.map((stamp) => (
						<image
							key={stamp.id}
							href="/star.png"
							x={stamp.x}
							y={stamp.y}
							width={imageSize.width}
							height={imageSize.height}
						/>
					))}
					<image
						href="/star.png"
						x={mousePosition.x - imageSize.width / 2}
						y={mousePosition.y - imageSize.height / 2}
						width={imageSize.width}
						height={imageSize.height}
					/>
				</g>
			</svg>
		</div>
	);
};

export default OrganicSVGBoundedStampCanvas;
