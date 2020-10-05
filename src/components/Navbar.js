import React from "react";
import { AppBar, Toolbar, IconButton, Link } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar({ darkMode, setDarkMode }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Link href="/" variant="h6" color="inherit" className={classes.title}>
            Quiz Game
          </Link>
          <div>
            <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
