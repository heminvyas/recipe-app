import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  InputBase,
  Grid,
  Paper,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {
  withStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";

const App = () => {
  const APP_ID = "a8c97c7a";
  const APP_KEY = "a4b0b108a63cb7cd6a009d75207e7f86";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("avocado");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "flex",
      flexWrap: "wrap",
      /*background:
        "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",*/
    },
    toolBar: {
      background: "#fecfef",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    searchBox: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      flexWrap: "wrap",
    },
    offset: theme.mixins.toolbar,
    margin: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "green",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "green",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "red",
        },
        "&:hover fieldset": {
          borderColor: "yellow",
        },
        "&.Mui-focused fieldset": {
          borderColor: "green",
        },
      },
    },
  })(TextField);

  const ValidationTextField = withStyles({
    root: {
      "& input:valid + fieldset": {
        borderColor: "green",
        borderWidth: 2,
      },
      "& input:invalid + fieldset": {
        borderColor: "red",
        borderWidth: 2,
      },
      "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        padding: "4px !important", // override inline-style
      },
    },
  })(TextField);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#b190a7',
      },
    },
  });

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center">
        <AppBar position="fixed">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h6" className={classes.title} align="center" color="secondary">
              Recipes
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid container direction="row" justify="center">
        <form
          onSubmit={getSearch}
          className={classes.searchBox}
          noValidate
          autoComplete="off"
        >
          <div className={classes.offset} />
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.margin}
              label="Search Recipes"
              id="mui-theme-provider-outlined-input"
              value={search}
              onChange={updateSearch}
              color="secondary"
            />
          </ThemeProvider>
        </form>
      </Grid>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
