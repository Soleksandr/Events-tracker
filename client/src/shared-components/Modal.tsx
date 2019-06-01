import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";

interface IModalProps extends DialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: (e: any) => void;
  title: string;
}

export const Modal: React.SFC<IModalProps> = ({ title, open, onCancel, onOk, children, ...other }) => {
  return (
    <div>
      <Dialog open={open}
        aria-labelledby="form-dialog-title"
        {...other}
      >
        <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
        <DialogContent>
          { children }
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={onOk}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};