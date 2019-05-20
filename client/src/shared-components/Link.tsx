import React from "react";
import MuiLink from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

interface ILinkProps {
  to: string;
  children: any;
}

export const Link = ({ to, children }: ILinkProps) => (
  <MuiLink
    color="inherit"
    underline="none"
    component={(props) => (
      <RouterLink to={to}
        {...props}
      >{children}</RouterLink>
    )}
  />
);