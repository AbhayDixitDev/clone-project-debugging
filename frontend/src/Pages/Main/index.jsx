import { Link } from "react-router-dom";
import Button from "../../Components/Button";

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightIcon from '@mui/icons-material/Copyright';
import logo from "../../images/white_logo.svg";
import styles from "./styles.module.scss";


const navLinks = [
    {name:"Premium", link:"#"},
    {name:"Support", link:"#"},
    {name:"Download", link:"#"},
    {name:"Sign Up", link:"#"},
    {name:"Log In", link:"#"},
]

const companyLInks = ["About","Jobs","For the record"];

const communitiesLinks = ["For Artists","Developers","Advertising","Investors","Vendors"];

const usefulLInks = ["Support","Web Player","Free Mobile App"];

const footerLinks = [
    "Legal",
    "Privacy center",
    "Privacy policy",
    "Cookies",
    "About ads",
    "Additional CA Privacy Disclosures",
]

const footerIcons = [
    <InstagramIcon />,
    <FacebookIcon />,
    <TwitterIcon />,
]

const Main = () => {
    return (
        <div className={styles.container}>
			<nav className={styles.navbar_container}>
				<Link to="/" className={styles.nav_logo}>
					<img src={logo} alt="logo" />
				</Link>
				<div className={styles.nav_links}>
					{navLinks.map((link, index) => (
						<Link key={index} to={link.link} className={styles.links}>
							{link.name}
						</Link>
					))}
				</div>
			</nav>
			<main className={styles.main_container}>
				<div className={styles.main}>
					<h1>Listening is everything</h1>
					<p>Millions of songs and podcasts. No credit card needed.</p>
					<Link to="/signup">
						<Button
							label="GET SPOTIFY FREE"
							style={{ color: "#2941ab", width: "18rem", fontSize: "1.4rem" }}
						/>
					</Link>
				</div>
			</main>
			<footer className={styles.footer_container}>
				<div className={styles.footer_1}>
					<Link to="/" className={styles.footer_logo}>
						<img src={logo} alt="logo" />
					</Link>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Company</div>
						{companyLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Communities</div>
						{communitiesLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Useful links</div>
						{usefulLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_icons}>
						{footerIcons.map((icon, index) => (
							<div className={styles.icon} key={index}>
								{icon}
							</div>
						))}
					</div>
				</div>
				<div className={styles.footer_2}>
					<div className={styles.footer_2_links}>
						{footerLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.copy_right}>
						<CopyrightIcon />
						<span>2021 Spotify</span>
					</div>
				</div>
			</footer>
		</div>

    )
}

export default Main
