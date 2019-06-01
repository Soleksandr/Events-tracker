import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MuiTable from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { styles } from "./Table-styles";
import { EventForm } from "../Event-form/Event-form";
import { withStyles, WithStyles } from "@material-ui/core/styles";

let id = 0;
function createData(name: any) {
  id += 1;
  return { id, name, calories: Date.now(), fat: Date.now() };
}

const rows = [
  createData("Frozen yoghurt"),
  createData("Ice cream sandwich"),
  createData("Eclair"),
  createData("Cupcake"),
  createData("Gingerbread"),
];

const SimpleTable: React.SFC<WithStyles> = (props) => {
  const { classes } = props;

  const [ isEventFormOpen, setEventFormOpen ] = React.useState(false);

  const openEventForm = () => {
    setEventFormOpen(true);
  };

  const closeEventForm = () => {
    setEventFormOpen(false);
  };

  return (
    <>
      <div>
        <div className={classes.toolbar}>
          <Button variant="outlined"
            color="primary"
            onClick={openEventForm}
          >
          New Event
          </Button>
        </div>
        <Paper className={classes.root}>
          <MuiTable className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Next Event At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </Paper>
      </div>
      <EventForm
        isEventFormOpen={isEventFormOpen}
        closeEventForm={closeEventForm}
      />
    </>
  );
};

export const Table = withStyles(styles)(SimpleTable);