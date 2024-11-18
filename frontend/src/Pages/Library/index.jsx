import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Playlist from "../../Components/Playlist";
import styles from "./styles.module.scss";

const Library = () => {
	const { playlists } = useSelector((state) => state.playlists);
	const { user } = useSelector((state) => state.user);

	if (!playlists || !Array.isArray(playlists) || playlists.length === 0) {
		return <div className={styles.container} style={{ marginTop: "200px" ,marginLeft:"280px"}}><h1>No Playlists Available</h1></div>;
	}

	const likedSongsCount = user.likedSongs ? user.likedSongs.length : 0;

	return (
		<div className={styles.container} style={{ marginTop: "59px" ,marginLeft:"250px" }}>
			<h1>Playlists</h1>
			<div className={styles.playlists_container}>
				<Link to="/collection/tracks">
					<div className={styles.liked_songs}>
						<h1>Liked Songs</h1>
						<p>{likedSongsCount} Liked Songs</p>
					</div>
				</Link>
				<Playlist playlists={playlists} />
			</div>
		</div>
	);
};

export default Library;
