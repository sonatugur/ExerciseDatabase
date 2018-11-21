import React, { Component, Fragment } from "react";
import Form from "./Form";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Consumer } from "../../context";
import { withContext } from "../../context";

class CreateDialog extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  handleOnCreate = exercise => {
    this.handleToggle();
    this.props.onCreate(exercise);
  };

  render() {
    const { open } = this.state,
      { muscles } = this.props;
    return (
      <Fragment>
        <Button variant="fab" onClick={this.handleToggle} mini>
          <AddIcon />
        </Button>
        <Dialog open={this.state.open} onClose={this.handleToggle} fullWidth>
          <DialogTitle id="alert-dialog-title">
            Create a new Exercise
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please fill out the form below
            </DialogContentText>

            <Form muscles={muscles} onSubmit={this.handleOnCreate} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
export default withContext(CreateDialog);
