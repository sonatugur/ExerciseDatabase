import React, { Component, Fragment } from "react";
import { Header, Footer } from "./Layouts";
import Exercises from "./Exercises/index";
import { muscles, exercises } from "../store";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "../context";

export default class extends Component {
  state = {
    exercises,
    exercise: {},
    editMode: false,
    category: ""
  };
  getExercisesByMuscle() {
    let initialObject = muscles.reduce(
      (result, muscle) => ({
        ...result,
        [muscle]: []
      }),
      {}
    );
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;
        exercises[muscles] = [...exercises[muscles], exercise];

        return exercises;
      }, initialObject)
    );
  }

  footerSelect = category =>
    this.setState({
      category
    });

  handleExerciseSelected = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: false
    }));

  handleCreateExercise = exercise =>
    this.setState(prevState => ({
      exercises: [...prevState.exercises, exercise]
    }));

  handleDelete = id =>
    this.setState(({ exercises, exercise, editMode }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: exercise.id === id ? false : editMode,
      exercise: exercise.id === id ? {} : exercise
    }));

  handleExerciseEdit = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }));

  handleEditForm = exercise => {
    this.setState(({ exercises }) => ({
      exercises: [...exercises.filter(ex => ex.id !== exercise.id), exercise],
      exercise
    }));
  };

  getContext = () => ({
    muscles,
    ...this.state,
    exercisesByMuscles: this.getExercisesByMuscle(),
    onCategorySelect: this.footerSelect,
    onCreate: this.handleCreateExercise,
    onSelectEdit: this.handleExerciseEdit,
    onDelete: this.handleDelete,
    onSelect: this.handleExerciseSelected,
    onEditForm: this.handleEditForm
  });

  render() {
    return (
      <Provider value={this.getContext()}>
        <CssBaseline />
        <Header />
        <Exercises />
        <Footer />
      </Provider>
    );
  }
}
