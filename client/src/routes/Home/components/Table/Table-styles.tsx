import { Theme } from "@material-ui/core/styles";

export const width = "80%";

export const styles = (theme: Theme) => ({
  root: {
    width,
    overflowX: "auto" as any,
    margin: `${theme.spacing(3)}px auto 0 auto`,
  },
  table: {
    minWidth: 700,
  },
  toolbar: {
    width,
    margin: " 30px auto"
  }
});