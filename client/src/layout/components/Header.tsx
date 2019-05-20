import React from "react";
import compose from "recompose/compose";
import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "../../shared-components/Link";
import { withRouter, RouteComponentProps } from "react-router";
import { withStyles, WithStyles } from "@material-ui/core/styles";

interface IAppBar extends WithStyles, RouteComponentProps {}

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

export const Header: React.SFC<IAppBar> = props => {
  const [ anchorEl, setAnchorEl ] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const { classes, history: { push } } = props;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const moveTo = (path: string) => {
    return (event: React.SyntheticEvent) => {
      event.preventDefault();

      push(path);
      handleClose();
    };
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton}
            color="inherit"
            aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"
            color="inherit"
            className={classes.grow}>
            <Link to="/">Events Tracker</Link>
          </Typography>
          <div>
            <IconButton
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={moveTo("/login")}>Log In</MenuItem>
              <MenuItem onClick={moveTo("/register")}>Register</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default compose<IAppBar, {}>(
  withRouter,
  withStyles(styles)
)(Header);
