import { Fragment, useState } from "react";
import axiosInstance from "../../redux/axiosInstance";
import Song from "../../Components/Song";
import Playlist from "../../Components/Playlist";
import { IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";

const Search = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState({ songs: [], playlists: [] }); // Initialize with empty arrays
	const [isFetching, setIsFetching] = useState(false);

	const handleSearch = async ({ currentTarget: input }) => {
		setSearch(input.value);
		setResults({ songs: [], playlists: [] }); // Reset results to empty arrays
		try {
			setIsFetching(true);
			const url = "http://localhost:8080/api" + `/?search=${input.value}`;
			const { data } = await axiosInstance.get(url);
			setResults(data || { songs: [], playlists: [] }); // Ensure data is defined
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};

	return (
		<div className={styles.container} style={{ backgroundColor: "red", marginTop: "40px" }}>
			<div className={styles.search_input_container}>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<input
					type="text"
					placeholder="Search for songs and playlists"
					onChange={handleSearch}
					value={search}
				/>
				<IconButton onClick={() => setSearch("")}>
					<ClearIcon />
				</IconButton>
			</div>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			)}
			{results.songs && results.songs.length > 0 && ( // Check if songs array has items
				<div className={styles.results_container}>
					<div className={styles.songs_container}>
						{results.songs.map((song) => (
							<Fragment key={song._id}>
								<Song song={song} />
							</Fragment>
						))}
					</div>
					{results.playlists && results.playlists.length > 0 && ( // Check if playlists array has items
						<div className={styles.playlists_container}>
							<Playlist playlists={results.playlists} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
