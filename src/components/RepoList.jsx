import React, { Fragment } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import RepoItem from "./RepoItem";
import Spinner from "./Spinner";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(0),
		paddingBottom: theme.spacing(3),
	},
}));

const RepoList = ({ github }) => {
	const classes = useStyles();
	if (github.loading) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<Container className={classes.cardGrid} maxWidth="lg">
					{!github.loading && github.repos.length !== 0 && (
						<Fragment>
							<Grid container spacing={4}>
								<Grid item xs={6} sm={6} align="left">
									<Typography variant="h5" style={{ marginTop: "20px" }}>
										{github.reposTotal} repository results
									</Typography>
								</Grid>
							</Grid>
						</Fragment>
					)}
					<Grid container spacing={4} justify="center">
						{github.repos.map((repo) => (
							<RepoItem key={repo.id} repo={repo} />
						))}
					</Grid>
				</Container>
			</Fragment>
		);
	}
};

const mapStateToProps = (state) => ({
	github: state.github,
});

export default connect(mapStateToProps, null)(RepoList);
