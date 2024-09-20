import React, { useState, useEffect } from "react";

interface CircleProps {
	cx: number;
	cy: number;
	initialColor: string;
}

const Circle: React.FC<CircleProps> = ({ cx, cy, initialColor }) => {
	const [color, setColor] = useState(initialColor);

	useEffect(() => {
		// Optional: Add a color-changing logic, e.g., using intervals
		const interval = setInterval(() => {
			setColor((prevColor) => (prevColor === "green" ? "brown" : "green"));
		}, 1000); // Change color every second

		return () => clearInterval(interval);
	}, []);

	return <circle cx={cx} cy={cy} r="10" fill={color} />;
};

export default Circle;
