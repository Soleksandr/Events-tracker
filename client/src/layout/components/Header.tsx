import React, { useState } from "react";
import compose from "recompose/compose";
import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { IUser } from "sdk/models";
import { Link } from "../../shared-components/Link";
import { withRouter, RouteComponentProps } from "react-router";
import { withStyles, WithStyles } from "@material-ui/core/styles";

export interface IHeaderProps extends WithStyles, RouteComponentProps {
  user: IUser;
  logOutUser: () => any;
}

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

const Header: React.SFC<IHeaderProps> = ({ user, history, classes, logOutUser }) => {
  const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    return setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    return setAnchorEl(null);
  };

  const moveTo = (path: string) => {
    return (event: React.SyntheticEvent) => {
      event.preventDefault();

      history.push(path);
      handleClose();
    };
  };

  const logOut = () => {
    handleClose();
    setTimeout(() => logOutUser(), 500); // @TODO find better solution
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"
            color="inherit"
            className={classes.grow}
          >
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
              <MenuItem
                onClick={user ? logOut : moveTo("/login")}
              >
                {user ? "Log Out" : "Log In"}
              </MenuItem>
              {!user && <MenuItem onClick={moveTo("/register")}>Register</MenuItem>}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default compose<IHeaderProps, {}>(
  withStyles(styles),
  withRouter
)(Header);
