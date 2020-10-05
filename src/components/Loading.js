import React from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "2em",
  },
  loadingSubtitle: {
    fontStyle: "italic",
  },
}));

const Loading = ({ loading }) => {
  const classes = useStyles();
  return (
    <>
      <CircularProgress color="secondary" className={classes.loading} />
      <Typography color="textSecondary" className={classes.loadingSubtitle}>
        Getting ready
      </Typography>
    </>
  );
};

export default Loading;
