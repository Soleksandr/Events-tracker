import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 3
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const Header: React.SFC<WithStyles<typeof styles>> = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Header);
