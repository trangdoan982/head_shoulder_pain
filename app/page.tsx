import Image from "next/image";
import Body from "./components/Body";
import BodyShape from "./components/BodyShape";
import ImageStampCanvas from "./components/Canvas";

export default function Home() {
	return (
		<div style={{ minHeight: "200vh" }}>
			{/* Makes the page scrollable */}
			<h1>Star Stamping Canvas</h1>
			<ImageStampCanvas />
			{/* Add more content here to make the page scrollable */}
		</div>
	);
}
