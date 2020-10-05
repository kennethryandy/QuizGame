import React, { useState } from "react";
import {
  Button,
  FormControl,
  NativeSelect,
  InputLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    width: "70%",
    [theme.breakpoints.up("lg")]: { width: "100%" },
  },
  item: {
    width: "100%",
  },
  selectBox: {
    width: "100%",
  },
  btn: {
    margin: "auto",
    marginTop: theme.spacing(3),
  },
}));

function Categories({ getUrl, darkMode }) {
  const classes = useStyles();
  const [catergoryInput, setCatergoryInput] = useState("");
  const [difficultyInput, setDifficultyInput] = useState("");
  const [typeInput, setTypeInput] = useState("");

  const handleSubmit = () => {
    getUrl(catergoryInput, difficultyInput, typeInput);
  };

  return (
    <Grid container alignContent="center" direction="column" spacing={4}>
      <Grid item className={classes.item}>
        <Typography variant="h6">Category</Typography>
        <FormControl className={classes.formWrapper}>
          <InputLabel shrink htmlFor="catergory">
            Select Catergory
          </InputLabel>
          <NativeSelect
            id="catergory"
            name="catergory"
            value={catergoryInput}
            onChange={(e) => setCatergoryInput(e.target.value)}
            className={classes.selectBox}
            fullWidth
          >
            <option value="">Any</option>
            <option value="19">Math</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="25">Art</option>
            <option value="27">Animals</option>
            <option value="20">Mythology</option>
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item className={classes.item}>
        <Typography variant="h6">Difficulty</Typography>
        <FormControl className={classes.formWrapper}>
          <InputLabel shrink htmlFor="difficulty">
            Select Difficulty
          </InputLabel>
          <NativeSelect
            id="difficulty"
            name="difficulty"
            value={difficultyInput}
            onChange={(e) => setDifficultyInput(e.target.value)}
            className={classes.selectBox}
          >
            <option value="">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item className={classes.item}>
        <Typography variant="h6">Type</Typography>
        <FormControl className={classes.formWrapper}>
          <InputLabel shrink htmlFor="type">
            Select Type
          </InputLabel>
          <NativeSelect
            id="type"
            name="type"
            value={typeInput}
            onChange={(e) => setTypeInput(e.target.value)}
            className={classes.selectBox}
          >
            <option value="">Any</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </NativeSelect>
          <Button
            className={classes.btn}
            size="large"
            color={darkMode ? "secondary" : "primary"}
            variant={darkMode ? "text" : "contained"}
            endIcon={<PlayArrowRoundedIcon />}
            onClick={handleSubmit}
          >
            Start
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Categories;
