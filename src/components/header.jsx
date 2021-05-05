import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Header({value, handleChange} ) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <h3>Sorting Algorithms Visualizer</h3>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Bubble" {...a11yProps(0)} />
          <Tab label="Selection" {...a11yProps(1)} />
          <Tab label="Insertion" {...a11yProps(2)} />
          <Tab label="Heap" {...a11yProps(3)} />
          <Tab label="Merge" {...a11yProps(4)} />
          <Tab label="Quick" {...a11yProps(5)} />
          <Tab label="All" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
    </div>
  );
}
