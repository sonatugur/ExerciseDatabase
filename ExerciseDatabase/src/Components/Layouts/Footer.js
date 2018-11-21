import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import withWidth from "@material-ui/core/withWidth";
import { withContext } from "../../context";
class Footer extends Component {
  onIndexSelect = (e, index) => {
    const { onCategorySelect, muscles } = this.props;
    onCategorySelect(index === 0 ? "" : muscles[index - 1]);
  };

  getIndex = () => {
    const { category, muscles } = this.props;
    return category ? muscles.findIndex(group => group === category) + 1 : 0;
  };
  render() {
    const { muscles, width } = this.props;
    return (
      <Paper>
        <Tabs
          onChange={this.onIndexSelect}
          value={this.getIndex()}
          indicatorColor="primary"
          textColor="primary"
          centered={width !== "xs"}
          scrollable={width === "xs"}
        >
          <Tab label="All" />
          {muscles.map(group => (
            <Tab key={group} label={group} />
          ))}
        </Tabs>
      </Paper>
    );
  }
}
export default withContext(withWidth()(Footer));
