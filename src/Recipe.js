import React, { useEffect, useState } from "react";
import style from "./recipe.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const Recipe = ({ title, calories, image, ingredients }) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			maxWidth: 280,
		},
		mediaImage: {
			width: 280,
		},
		grid: {
			padding: theme.spacing(2),
		}
	}));

	const classes = useStyles();

	return (
		<Grid className={classes.grid}>
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.mediaImage}
					component="img"
					alt={title}
					height="140"
					image={image}
					title={title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
					<ol>
						{ingredients.map((ingredient) => (
							<li>{ingredient.text}</li>
						))}
					</ol>
				</CardContent>
			</CardActionArea>
		</Card>
		</Grid>
	);
};

export default Recipe;
