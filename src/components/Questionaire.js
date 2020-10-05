import React from "react";
import {
  Button,
  Grid,
  Typography,
  Divider,
  MobileStepper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  questionWrapper: {
    textAlign: "center",
  },
  btnWrapper: {
    marginTop: "1em",
  },
  optionBtn: {
    width: "90%",
  },
  darkModeoptionBtn: {
    border: "1px solid white",
    color: "white",
    width: "90%",
  },
  stepper: {
    marginTop: ".5em",
    background: "none",
  },
  answered: {
    backgroundColor: "#651fff !important",
    color: "#ffffff !important",
  },
}));

function Questionaire({
  data: { question, correct_answer, category },
  currentQuestion,
  handleAnswer,
  shuffledAnswers,
  darkMode,
  nextStep,
  prevStep,
  answers,
}) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      spacing={3}
      className={classes.questionWrapper}
    >
      <Typography variant="h4" gutterBottom>
        {category}
      </Typography>
      <Divider light={darkMode} />
      <Grid item>
        <Typography variant="h5" gutterBottom>
          <span dangerouslySetInnerHTML={{ __html: question }} />
        </Typography>
      </Grid>

      <Grid item>
        <Divider variant="middle" light={darkMode} />
        <Grid container spacing={2} className={classes.btnWrapper}>
          {shuffledAnswers.map((answer, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                color="primary"
                variant={darkMode ? "text" : "contained"}
                size="medium"
                onClick={() => handleAnswer(answer, correct_answer)}
                fullWidth
                className={
                  darkMode
                    ? `${classes.darkModeoptionBtn} ${
                        answers.includes(answer) &&
                        answers.length !== currentQuestion
                          ? classes.answered
                          : ""
                      }`
                    : `${classes.optionBtn} ${
                        answers.includes(answer) &&
                        answers.length !== currentQuestion
                          ? classes.answered
                          : ""
                      }`
                }
                disabled={
                  answers.includes(answer) && answers.length !== currentQuestion
                }
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </Button>
            </Grid>
          ))}
        </Grid>
        <Divider
          variant="middle"
          light={darkMode}
          style={{ marginTop: "1em" }}
        />
        <MobileStepper
          className={classes.stepper}
          steps={10}
          position="static"
          variant="text"
          activeStep={currentQuestion}
          nextButton={
            <Button size="small" onClick={nextStep}>
              Skip <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              disabled={currentQuestion === 0 ? true : false}
              onClick={prevStep}
            >
              <KeyboardArrowLeft /> Back
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
}

export default Questionaire;
