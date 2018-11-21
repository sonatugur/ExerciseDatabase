import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import withWidth from "@material-ui/core/withWidth";

const styles = theme => ({
  FormControl: {
    width: 300,
    height: "auto"
  },
  FormControlXs: {
    width: 250
  },
  FormControlSm: {
    width: 350
  },
  FormControlM: {
    width: 450
  },
  FormControlL: {
    width: 600
  }
});

export default withWidth()(
  withStyles(styles)(
    class extends Component {
      state = this.handleInitialState();

      handleInitialState() {
        const { exercise } = this.props;
        return exercise
          ? exercise
          : {
              title: "",
              description: "",
              muscles: ""
            };
      }

      handleChange = name => ({ target: { value } }) =>
        this.setState({
          [name]: value
        });

      handleSubmit = () => {
        this.props.onSubmit({
          id: this.state.title.toLocaleLowerCase().replace(/ /g, "-"),
          ...this.state
        });
      };

      render() {
        const { classes, muscles: categories, width, exercise } = this.props,
          { title, description, muscles } = this.state;
        var formClass;
        switch (width) {
          case "xs":
            formClass = classes.FormControlXs;
          case "sm":
            formClass = classes.FormControlS;
          case "md":
            formClass = classes.FormControlM;
          case "lg":
            formClass = classes.FormControlM;
          default:
            formClass = classes.FormControl;
        }
        return (
          <Fragment>
            <form>
              <TextField
                className={formClass}
                value={title}
                label="title"
                margin="normal"
                onChange={this.handleChange("title")}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor="muscles">Muscles</InputLabel>
                <Select value={muscles} onChange={this.handleChange("muscles")}>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />

              <TextField
                fullWidth
                multiline
                rows={2}
                value={description}
                label="description"
                margin="normal"
                onChange={this.handleChange("description")}
              />
              <Button
                onClick={this.handleSubmit}
                color="primary"
                variant="contained"
                disabled={!title || !muscles}
              >
                {exercise ? "Edit" : "Create"}
              </Button>
            </form>
          </Fragment>
        );
      }
    }
  )
);
