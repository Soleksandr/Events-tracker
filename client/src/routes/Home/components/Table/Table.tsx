import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MuiTable from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import React, { useState, useEffect } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { IUser } from "sdk";
import { styles } from "./Table-styles";
import { EventForm } from "../Event-form/Event-form";
import { withStyles, WithStyles } from "@material-ui/core/styles";;

export interface ITableRows {
  id: string;
  title: string;
  createdAt: Date;
  nextEventDate: Date;
}

export interface ITableProps extends WithStyles {
  createEvent: (data: any) => any;
  getAllEvents: () => any;
  events: ITableRows[];
  user: IUser;
}

const SimpleTable: React.SFC<ITableProps> = (props) => {
  const { classes, user, getAllEvents } = props;

  const [ isEventFormOpen, setEventFormOpen ] = useState(false);

  const openEventForm = () => {
    setEventFormOpen(true);
  };

  const closeEventForm = () => {
    setEventFormOpen(false);
  };

  useEffect(() => {
    getAllEvents();
  }, [ getAllEvents, user ]);

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
              {props.events.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th"
                    scope="row"
                  >
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell align="right">{row.nextEventDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </Paper>
      </div>
      <EventForm
        isEventFormOpen={isEventFormOpen}
        closeEventForm={closeEventForm}
        {...props}
      />
    </>
  );
};

export const Table = withStyles(styles)(SimpleTable);