import React, { useEffect, useState } from 'react';
import Quiz_Header from '../Quiz_component/Quiz_Header';
import { useLocation } from 'react-router-dom';
import { FaArrowTurnDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import img from '../Quiz_images/1 number.png';
import { Box } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Quiz_game = () => {
  const location = useLocation();
  const category = location.state?.item || "C";
  let History = useHistory();

  let [height, setheight] = useState(19);
  let [AnimateButton, setAnimateButton] = useState(0);
  let [index, setindex] = useState(0);
  let [currentquestion, setcurrentquestion] = useState([]);
  let [Allquestion, setAllquestion] = useState([]);
  let [CorrectAnswer, setCorrectAnswer] = useState(0);
  let [CorrectQuestion, setCorrectQuestion] = useState([]);
  let [WrongQuestion, setWrongQuestion] = useState([]);
  let [Username, setUsername] = useState(JSON.parse(localStorage.getItem("userData")) || { name: "Your" });
  const [clicked, setClicked] = useState(false); // Track if any button is clicked


  // Timer state
  const [timer, setTimer] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);

  // Check-Question || Animation
  function animation(UserAnswer) {
    if (height !== 100) {
      setheight(height + 19);
      setAnimateButton(1);
    }

    if (!clicked) {
      setClicked(true);  
  }

    let Btn = setInterval(() => {
      setAnimateButton(0);
      if (index !== 3) {
        setindex(index + 1);
        setClicked(false);  
      } else {
        handleClickOpen();
      }
      clearInterval(Btn);
    }, 1000);

    // Check Question 
    if (currentquestion[index]?.answer === UserAnswer) {
      setCorrectAnswer(CorrectAnswer + 1);
      setCorrectQuestion(prev => [...prev, currentquestion[index]]);
    } else {
      setWrongQuestion(prev => [...prev, currentquestion[index]]);
    }

    // Reset timer
    resetTimer();
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let Getquestion = async () => {
    try {
      let res = await axios.get('https://quiz-backend-s.onrender.com/question/read');
      setAllquestion(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      History.push('/');
    } else {

      Getquestion();
    }
  }, []);

  // Filter Question

  useEffect(() => {
    const filteredQuestions = Allquestion.filter(
      question => question.category.toLowerCase() === category.toLowerCase()
    );
    setcurrentquestion(filteredQuestions);
  }, [Allquestion]);

  // Start the timer for each question

  useEffect(() => {
    if (timerRunning && timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timerInterval); // Cleanup interval on unmount
    } else if (timer === 0) {

      setTimer(25); // Reset timer
      if (index !== 3) {
        animation();
      } else {
        handleClickOpen();
      }
    }
  }, [timerRunning, timer, index]);

  // Reset Timer for new question
  const resetTimer = () => {
    setTimer(25);
    setTimerRunning(true);
  };

  // Start the timer when the index changes (i.e., new question appears)
  useEffect(() => {
    if (index === 0) {
      setTimerRunning(true);
    }
  }, [index]);

  return (
    <div>
      <Quiz_Header />
      <div className='hero-video-h-100 d-flex align-items-center overflow-hidden'>
        <div className=' container-fluid d-flex justify-content-center w-100  playground '>
          <div className='progress-Bar animated-text delay-2'>
            <div id='animation-Bar' style={{ height: `${height}%` }}></div>
            {/* Progress stops */}
            <div className='stop p-1 px-2'>0</div>
            <div className='stop p-1 px-2'>1</div>
            <div className='stop p-1 px-2'>2</div>
            <div className='stop p-1 px-2'>3</div>
            <div className='stop p-1 px-2'>4</div>
            <div className='stop p-1 px-2'>5</div>
          </div>

          <div className='container h-100 d-flex align-items-center justify-content-around flex-column '>
            <div className='w-100'>
              <h2 style={{ color: '#C2FFC7' }} className={`text-center animated-text ${AnimateButton === 1 ? 'animate-button' : ''}`}>
                {currentquestion[index]?.question || "Loading..."}
              </h2>
            </div>

            {/* Display Timer */}
            <div className={`timer animated-text delay-2 ${AnimateButton === 1 ? 'animate-button' : ''}`}>
              <div className="timer-container">
                <div className="timer-progress" style={{ width: `${(timer / 25) * 100}%` }}></div>
                <h4 className="timer-text">{timer}</h4>
              </div>
            </div>


            <div className={`w-100 d-flex justify-content-end brain animated-text delay-1 ${AnimateButton === 1 ? 'animate-button' : ''}`}>
              <Button>
                <FaArrowTurnDown style={{ fontSize: '40px', transform: 'rotate(270deg)', color: '#C2FFC7' }} onClick={animation} />
              </Button>
            </div>

            <div className={`option animated-text d-flex flex-wrap align-items-center justify-content-between gap-3 delay-2 ${AnimateButton === 1 ? 'animate-button' : ''}`}>
              {
                currentquestion[index]?.options?.map((e, i) => (
                  <Button onClick={() => animation(e)} disabled={clicked}  className={AnimateButton === 1 ? 'animate-button button' : 'button'} key={i}>
                    {e}
                  </Button>
                ))
              }
            </div>
            <div>
              <React.Fragment>
                <BootstrapDialog aria-labelledby="customized-dialog-title" open={open} style={{ backdropFilter: '100px !important' }}>
                  <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#00fb54" }} id="customized-dialog-title">
                    Quiz-Result
                  </DialogTitle>

                  <DialogContent dividers sx={{ width: 'fit-content', height: 'auto', backgroundColor: '#1d1d1d' }} className='d-flex flex-column align-items-center justify-content-center'>
                    <Typography>
                      <h4 style={{ color: '#C2FFC7' }}>{Username.name} quiz has been submitted!</h4>
                    </Typography>
                    <Typography gutterBottom sx={{ width: '500px', height: '200px', color: '#C2FFC7' }} className='d-flex align-items-center justify-content-evenly'>
                      <img src={img} alt="" width={'25%'} />
                      <Box className='d-flex flex-column gap-2'>
                        <h5 style={{ color: '#00FB54' }}>Correct - Answer &nbsp;:&nbsp; {CorrectAnswer} / 4</h5>
                        <h5 style={{ color: '#FF5F5F' }}>Wrong &nbsp;- Answer &nbsp;:&nbsp; {4 - CorrectAnswer} / 4</h5>
                        <h5 style={{ color: '#FFDC6F', }}>Your &nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;Score&nbsp;&nbsp; :&nbsp; {CorrectAnswer === 4 ? "100%" : CorrectAnswer === 3 ? "75%" : CorrectAnswer === 2 ? "50%" : CorrectAnswer === 1 ? "25%" : "0%"}</h5>
                      </Box>
                    </Typography>

                    {/* Display Correct Answer List */}
                    <Typography sx={{ height: 'fit-content !important' }}>
                      <p style={{ color: '#C2FFC7' }}>
                        <h4 className='mb-4 px-1'>Correct Answer :-</h4>
                        {CorrectAnswer !== 0 && CorrectQuestion.length > 0 && CorrectQuestion.map((e, i) => (
                          <ul key={i}>
                            <li>{e.question} : <span style={{ color: '#00bf54', fontSize: '18px' }}> {e.answer}</span><br /></li>
                          </ul>
                        ))}
                      </p>

                      {/* Display Wrong Answer List */}
                      <p style={{ color: '#C2FFC7' }}>
                        <h4 className='mt-4 px-1 pb-2'>Wrong Answer :-</h4>
                        {WrongQuestion.length > 0 && WrongQuestion.map((e, i) => (
                          <ul key={i}>
                            <li>{e.question} : <span style={{ color: '#ff5f5f', fontSize: '18px' }}> {e.answer}</span><br /></li>
                          </ul>
                        ))}
                      </p>
                    </Typography>
                  </DialogContent>

                  <DialogActions sx={{ backgroundColor: '#1d1d1d' }}>
                    <Link to="/Home">
                      <Button autoFocus onClick={handleClose} sx={{ color: '#1d1d1d', border: '1px solid #C2FFC7', backgroundColor: '#00fb54' }}>
                        Go back
                      </Button>
                    </Link>
                  </DialogActions>
                </BootstrapDialog>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz_game;
