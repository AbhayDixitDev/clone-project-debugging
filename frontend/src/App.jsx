import { Fragment, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom"; // Added Navigate import
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice/apiCalls"; // Ensure this path is correct
import { getPlayLists } from "./redux/playListSlice/apiCalls"; // Ensure this path is correct
import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import Library from "./Pages/Library";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import Playlist from "./Pages/Playlist";
import Search from "./Pages/Search";
import LikedSongs from "./Pages/LikedSongs";
import Profile from "./Pages/Profile";
import { Provider } from "react-redux"; // Import Provider
import store from "./redux/store"; // Ensure this path is correct

const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const { currentSong } = useSelector((state) => state.audioPlayer);

	useEffect(() => {
		let token = null;
		const root = JSON.parse(window.localStorage.getItem("persist:root"));

		if (root) {
			const { auth } = root;
			const { user } = JSON.parse(auth);
			if (user) token = user.token;
		}

		if (user && token) {
			getUser(user._id, dispatch);
			getPlayLists(dispatch);
		}
	}, [dispatch, user]);

	return (
		<Provider store={store}> {/* Wrap the app in Provider */}
			<Fragment>
				{user &&
					navigate.pathname !== "/login" &&
					navigate.pathname !== "/" &&
					navigate.pathname !== "/signup" &&
					navigate.pathname !== "/not-found" && (
						<Fragment>
							<Navbar />
							<Sidebar />
							{currentSong && <AudioPlayer />}
						</Fragment>
					)}
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/home/*" element={<Home />} /> {/* Ensure PrivateRoute is used for protected routes */}
					<Route path="/collection/tracks/*" element={<LikedSongs />} /> {/* Ensure PrivateRoute is used for protected routes */}
					<Route path="/collection/playlists/*" element={<Library />} /> {/* Ensure PrivateRoute is used for protected routes */}
					<Route path="/search/*" element={<Search />} /> {/* Ensure PrivateRoute is used for protected routes */}
					<Route path="/playlist/:id" element={<Playlist />} /> {/* Ensure PrivateRoute is used for protected routes */}
					<Route path="/me/*" element={<Profile />} /> {/* Ensure PrivateRoute is used for protected routes */}
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/not-found" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/not-found" />} />
				</Routes>
			</Fragment>
		</Provider>
	);
};

export default App;