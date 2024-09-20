"use client";
import React, { useRef, useEffect, useState } from "react";
import Circle from "./Circle";
import Body from "./Body";

const BodyShape: React.FC = () => {
	const pathRef = useRef<SVGPathElement>(null);
	const [circlePositions, setCirclePositions] = useState<
		{ cx: number; cy: number }[]
	>([]);
	const [dimensions, setDimensions] = useState(
		pathRef.current?.getBoundingClientRect() ?? { width: 0, height: 0 }
	);
	const scaleFactor = 0.9;
	const [translate, setTranslate] = useState({ translateX: 1, translateY: 1 });

	useEffect(() => {
		if (pathRef.current) {
		}
	}, []);

	useEffect(() => {
		if (pathRef.current) {
			const { width, height } = pathRef.current.getBoundingClientRect();
			// Update dimensions only if they have changed
			if (width !== dimensions.width || height !== dimensions.height) {
				setDimensions({ width, height });
			}

			const scaledWidth = dimensions.width * scaleFactor;
			const scaledHeight = dimensions.height * scaleFactor;
			const translateX = (dimensions.width - scaledWidth) / 2;
			const translateY = (dimensions.height - scaledHeight) / 2;
			setTranslate({ translateX, translateY });

			const pathLength = pathRef.current.getTotalLength();
			console.log("PPPP", pathLength);
			const numCircles = 1;
			const positions = [];

			const point = pathRef.current.getPointAtLength(1 * pathLength);
			// head
			const point2 = pathRef.current.getPointAtLength(1000);
			positions.push({ cx: point.x, cy: point.y });
			positions.push({ cx: point2.x, cy: point2.y });

			setCirclePositions(positions);
		}
	}, [dimensions]);

	return (
		<svg viewBox="0 0 1000 1200">
			{/* Body shape */}
			{/* outer */}
			<path
				stroke="#f2adb8"
				ref={pathRef}
				strokeWidth="6"
				fill="none"
				className="cls-1"
				d="M54.79,691.35c-44.49-61.84-74.21-167.21-30-264,2.17-4.76,45.98-97.16,141-133,55.73-21.02,76-2.56,133-33,5.4-2.88,64.67-35.52,95-100,15.68-33.33,11.47-49.34,10-54-7.55-24.01-30.08-25.96-33-46-3.09-21.2,18.07-46.64,43-55,29.5-9.89,66.31,3.43,72,23,4.98,17.12-17.44,26.7-26,59-8.07,30.47,1.29,61.93,11,78,27.34,45.23,94.15,29.3,168,48,140.47,35.58,203.9,169.68,216,197,44.89,101.4,44.48,206.4,34,271-2.04,12.56-15.07,32.97-22,29-18.53-10.61-49.78-112.25-70-175-14.48-44.94-22-104-37-126-9.83-14.42-30.2-33.52-39-31-15.07,4.32-18.16,43.14-15,71,3.49,30.76,12.26,81.99,11,99-4,54,5.39,43.32-37,209-18.83,73.6-18.48,84.58-17,95,8.88,62.33,49.1,108.12,36,147-6.53,19.38-9.78,17.01-28,18-34.48,1.87-68.98-49.97-72-56-13.87-27.66-8.89-42.85-28-104-2.79-8.92.29.68-6-6-10.72-11.39-33.86-23.13-80-16-73.02,11.29-75.47,9.51-81,16-17.08,20.03-.86,40.76-10,77-13.35,52.9-70.52,98.41-97,88-29.49-11.59-21.06-66.44,7-123,5.49-11.07-7.22-61.1-16-77-5.87-10.63-88.86-141.81-100-203-28.53-156.75-30.75-192.14-45-194-20.71-2.7-47.18,68.04-57,104-5.62,20.6-14.31,53.59-10,95,8.05,77.23,55.22,125.25,48,131-5.73,4.57-41.56-20.86-69-59Z"
			/>
			{/* inner */}
			<path
				ref={pathRef}
				stroke="black"
				strokeWidth="6"
				fill="none"
				className="cls-1"
				// transform={`translate(${translate.translateX}, ${translate.translateY})`}
				d="M37.11,646.69c-40.66-56.51-47.4-151.55-7-240,1.99-4.35,36.17-78.25,123-111,50.93-19.21,93.91-11.18,146-39,4.93-2.63,62.29-33.07,90-92,14.33-30.46,10.34-63.74,9-68-6.9-21.94-27.33-26.68-30-45-2.83-19.37,15.21-38.36,38-46,26.96-9.04,47.8,6.12,53,24,4.55,15.64-15.18,24.49-23,54-7.38,27.85,7.12,67.31,16,82,24.98,41.33,88.51,30.91,156,48,128.37,32.51,201.95,154.03,213,179,41.02,92.67,55.58,167.97,46,227-1.86,11.48-12.67,66.62-19,63-16.94-9.7-38.52-133.66-57-191-13.23-41.07-37.29-98.9-51-119-8.98-13.18-37.95-14.3-46-12-13.78,3.94-19.89,52.54-17,78,3.19,28.11,10.15,73.45,9,89-3.66,49.35,10.74,39.6-28,191-17.21,67.26-21.36,70.48-20,80,8.11,56.96,37.02,85.54,25.05,121.07-5.97,17.71-8.93,15.55-25.59,16.45-31.51,1.71-63.03-45.67-65.8-51.18-12.67-25.27-8.13-39.15-25.59-95.04-2.55-8.15.26.62-5.48-5.48-9.8-10.41-30.94-21.14-73.11-14.62-66.73,10.32-68.97,8.69-74.02,14.62-15.6,18.31-.78,37.24-9.14,70.37-12.2,48.34-64.44,89.93-88.64,80.42-26.95-10.59-19.24-60.71,6.4-112.4,5.02-10.12-37.06-51.67-45.08-66.2-5.36-9.71-67.82-134.09-78-190-26.08-143.24-38.98-168.3-52-170-18.93-2.47-44.02,43.13-53,76-5.14,18.82-24.94,65.15-21,103,7.35,70.58,46.59,140.75,40,146-5.24,4.17-30.92-40.14-56-75Z"
			/>

			{/* Render Circles */}
			{circlePositions.map((pos, index) => (
				<Circle
					key={index}
					cx={pos.cx}
					cy={pos.cy}
					initialColor={index % 2 === 0 ? "green" : "brown"}
				/>
			))}
		</svg>
	);
};

export default BodyShape;
