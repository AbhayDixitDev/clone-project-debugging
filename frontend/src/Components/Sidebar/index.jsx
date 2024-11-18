import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPlayList } from "../../redux/playListSlice/apiCalls";
import { Modal, Button, Form } from "react-bootstrap"; 
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import logo from "../../images/white_logo.svg";
import likeImg from "../../images/like.jpg";
import styles from "./styles.module.scss";

const Sidebar = () => {
	const { playlists, getPlayListProgress, createPlayListProgress } =
		useSelector((state) => state.playlists);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);
	const [playlistData, setPlaylistData] = useState({
		name: "",
		desc: "",
		img: "",
	});

	const handleCreatePlayList = () => {
		const data = {
			...playlistData,
			user: user._id,
			songs: [],
		};
		createPlayList(data, dispatch);
		setShowModal(false); 
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setPlaylistData({ ...playlistData, [name]: value });
	};

	return (
		<div className={styles.container}>
			<img className={styles.logo_img} src={logo} alt="logo" />
			<NavLink
				to="/home"
				className={styles.menu_link}
				activeclassname={styles.active_menu}
			>
				<HomeIcon />
				<span>Home</span>
			</NavLink>
			<NavLink
				to="/search"
				className={styles.menu_link}
				activeclassname={styles.active_menu}
			>
				<SearchIcon />
				<span>Search</span>
			</NavLink>
			<NavLink
				to="/collection/playlists"
				className={styles.menu_link}
				activeclassname={styles.active_menu}
			>
				<LibraryMusicIcon />
				<span>Your Library</span>
			</NavLink>
			<div
				className={styles.create_playlist_btn}
				onClick={() => setShowModal(true)} 
			>
				<AddIcon />
				<span>Create Playlist</span>
			</div>
			<NavLink
				to="/collection/tracks"
				className={styles.menu_link}
				activeclassname={styles.active_menu}
			>
				<img src={likeImg} alt="Liked Songs" />
				<span>Liked Songs</span>
			</NavLink>
			<div className={styles.underline}></div>
			{getPlayListProgress || createPlayListProgress ? (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="3rem" />
				</div>
			) : (
				<Fragment>
					{playlists.map((playlist) => (
						<NavLink
							key={playlist._id}
							to={`/playlist/${playlist._id}`}
							activeclassname={styles.active_link}
							className={styles.playlist_link}
						>
							{playlist.name}
						</NavLink>
					))}
				</Fragment>
			)}

			<Modal show={showModal} onHide={() => setShowModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Create Playlist</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formPlaylistName">
							<Form.Label>Playlist Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter playlist name"
								name="name"
								value={playlistData.name}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formPlaylistDesc">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								name="desc"
								value={playlistData.desc}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formPlaylistImg">
							<Form.Label>Image URL</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image URL"
								name="img"
								value={playlistData.img}
								onChange={handleInputChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={handleCreatePlayList}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Sidebar;
