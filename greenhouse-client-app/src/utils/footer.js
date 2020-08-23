import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import "../styles/footer.css"

export default function Copyright() {
	return (
		<div className="footer_cs">
			<Typography variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="https://material-ui.com/">
					Your Website
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</div>
	);
}