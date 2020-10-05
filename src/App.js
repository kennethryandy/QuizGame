import React, { useState } from "react";
import { shuffle } from "./helpers";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  CssBaseline,
} from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Questionaire from "./components/Questionaire";
import Loading from "./components/Loading";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [revealCorrectAnswer, setRevealCorrectAnswer] = useState(false);
  const [currentQuestion, setCurrenQuestion] = useState(0);
  const [score, setScore] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [finalScore, setFinalScore] = useState([]);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        light: "#272b31",
        main: "#393e46",
        dark: "#60646b",
        contrastText: "#fff",
      },
      secondary: {
        light: "#a6a6a6",
        main: "#eeeeee",
        dark: "#f1f1f1",
        contrastText: "#000",
      },
    },
  });
  const theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        light: "#00695f",
        main: "#009688",
        dark: "#33ab9f",
        contrastText: "#fff",
      },
      secondary: {
        light: "#00a152",
        main: "#00e676",
        dark: "#33eb91",
        contrastText: "#000",
      },
    },
  });

  const getQuestion = (category, difficulty, type) => {
    const API_URL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`;
    setLoading(true);
    fetchQuestionAPI(API_URL);
  };

  const fetchQuestionAPI = async (api) => {
    const res = await fetch(api);
    const data = await res.json();

    const shuffledAnswers = shuffle([
      data.results[0].correct_answer,
      ...data.results[0].incorrect_answers,
    ]);

    setQuestionData(data.results);
    setShuffledAnswers(shuffledAnswers);
    setLoading(false);
  };

  const handleAnswer = (answer, correct_answer) => {
    if (answer === correct_answer) {
      setFinalScore((prevState) => [...prevState, answer]);
    }
    if (currentQuestion < score.length) {
      let scores = score;
      scores[currentQuestion] = answer;
      setScore(scores);
      if (answer === correct_answer) {
        setFinalScore(answer);
      } else {
        let newAns = finalScore;
        const index = newAns.findIndex((i) => i === correct_answer);
        newAns[index] = "";
        setFinalScore(newAns);
      }
    } else {
      setScore((prevState) => [...prevState, answer]);
    }
    //shuffle the answers
    setRevealCorrectAnswer(true);
    if (currentQuestion < questionData.length - 1) {
      const shuffledAnswers = shuffle([
        questionData[currentQuestion + 1].correct_answer,
        ...questionData[currentQuestion + 1].incorrect_answers,
      ]);

      //Proceed to the next question in 300 miliseconds.
      setTimeout(() => {
        setRevealCorrectAnswer(false);
        setCurrenQuestion(currentQuestion + 1);
        setShuffledAnswers(shuffledAnswers);
      }, 300);
    }
  };

  const handleQuestionNextStep = () => {
    if (!score[currentQuestion]) {
      let scores = score;
      scores[currentQuestion] = "";
    }
    setCurrenQuestion(currentQuestion + 1);
    const shuffledAnswers = shuffle([
      questionData[currentQuestion + 1].correct_answer,
      ...questionData[currentQuestion + 1].incorrect_answers,
    ]);
    setShuffledAnswers(shuffledAnswers);
  };

  const handleQuestionPrevStep = () => {
    setCurrenQuestion(currentQuestion - 1);
    const shuffledAnswers = shuffle([
      questionData[currentQuestion - 1].correct_answer,
      ...questionData[currentQuestion - 1].incorrect_answers,
    ]);
    setShuffledAnswers(shuffledAnswers);
  };

  const handleReset = () => {
    setQuestionData([]);
    setShuffledAnswers([]);
    setCurrenQuestion(0);
    setScore([]);
    setRevealCorrectAnswer(false);
    setFinalScore([]);
  };
  console.log("Answers: ", score);
  console.log("Score: ", finalScore);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <CssBaseline />
      <Paper square elevation={0} style={{ height: "100vh", width: "100vw" }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className={classes.appBarSpacer} />
        <Grid container>
          <Grid item sm={2} />
          <Grid item xs={12} sm={12} lg={8} style={{ textAlign: "center" }}>
            <Grid
              item
              xs={12}
              sm={12}
              lg={8}
              style={{ textAlign: "center", width: "100%", margin: "auto" }}
            >
              {loading ? (
                <Loading loading={loading} />
              ) : questionData[0] ? (
                currentQuestion < questionData.length - 1 ? (
                  <>
                    <Questionaire
                      data={questionData[currentQuestion]}
                      handleAnswer={handleAnswer}
                      shuffledAnswers={shuffledAnswers}
                      showCorrect={revealCorrectAnswer}
                      darkMode={darkMode}
                      currentQuestion={currentQuestion}
                      nextStep={handleQuestionNextStep}
                      prevStep={handleQuestionPrevStep}
                      answers={score}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h6">
                      You score{" "}
                      {finalScore.filter((score) => score !== "").length} out of{" "}
                      {questionData.length}.
                    </Typography>
                    <div>
                      <IconButton
                        color={darkMode ? "inherit" : "primary"}
                        size="medium"
                        onClick={handleReset}
                      >
                        <ReplayIcon />
                      </IconButton>
                    </div>
                  </>
                )
              ) : (
                <Categories getUrl={getQuestion} darkMode={darkMode} />
              )}
            </Grid>
          </Grid>
          <Grid item sm={2} />
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
