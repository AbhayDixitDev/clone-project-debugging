import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { currentSong } = useSelector((state) => state.audioPlayer);
	const styles = {
		padding: currentSong ? "6rem 0 10rem 26rem" : "6rem 0 0 26rem",
		backgroundColor: "#181818",
		color: "#ffffff",
		minHeight: "calc(100vh - 6rem)",
	};

	return (
		<Routes>
			<Route
				{...rest}
				path="/search/*" // Updated path to include trailing "*"
				element={
					<div style={styles}>
						<Component />
					</div>
				}
			/>
			<Route
				{...rest}
				path="/home/*" // Updated path to include trailing "*"
				element={
					<div style={styles}>
						<Component />
					</div>
				}
			/>
			<Route
				{...rest}
				path="/collection/playlists/*" // Updated parent route to include trailing "*"
				element={
					<div style={styles}>
						<Component />
					</div>
				}
			/>
			<Route
				{...rest}
				path="/search" // Added parent route with trailing "*"
				element={<Navigate to="/search/*" />}
			/>
		</Routes>
	);
};

export default PrivateRoute;