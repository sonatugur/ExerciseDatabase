import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Form from "./Form";
import { withContext } from "../../context";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    overflowY: "auto",
    [theme.breakpoints.up("sm")]: {
      marginTop: 5,
      height: "calc(%100 - 10px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%"
    }
  },
  "@global": {
    "html, body, #root": {
      height: "100%"
    }
  },
  container: {
    [theme.breakpoints.up("sm")]: {
      height: "calc(%100 - 64px - 48px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "calc(%100 - 56px - 48px)"
    }
  },
  item: {
    [theme.breakpoints.down("xs")]: {
      height: "50%"
    }
  }
});

const Exercise = ({
  classes,
  exercisesByMuscles,
  editMode,
  muscles,
  category,
  onSelect,
  onDelete,
  onEditForm,
  onSelectEdit,
  exercise,
  exercise: {
    id,
    title = "Welcome",
    description = "Please select an exercise from the left pane"
  }
}) => (
  <Grid container className={classes.container}>
    <Grid item className={classes.item} xs={12} sm={6}>
      <Paper className={classes.paper}>
        {exercisesByMuscles.map(([group, exercises]) =>
          !category || group === category ? (
            <Fragment>
              <Typography
                key={group}
                variant="headline"
                style={{ textTransform: "capitalize" }}
              >
                {group}
              </Typography>
              <List component="ul">
                {exercises.map(({ title, id }) => (
                  <ListItem key={id} button onClick={() => onSelect(id)}>
                    <ListItemText color="secondary" primary={title} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => onSelectEdit(id)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => onDelete(id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Fragment>
          ) : null
        )}
      </Paper>
    </Grid>
    <Grid item className={classes.item} xs={12} sm={6}>
      <Paper className={classes.paper}>
        <Typography variant="display1" gutterBottom>
          {title}
        </Typography>
        {editMode ? (
          <Form
            key={id}
            muscles={muscles}
            onSubmit={onEditForm}
            exercise={exercise}
          />
        ) : (
          <Typography variant="subheading">{description}</Typography>
        )}
      </Paper>
    </Grid>
  </Grid>
);

export default withContext(withStyles(styles)(Exercise));
