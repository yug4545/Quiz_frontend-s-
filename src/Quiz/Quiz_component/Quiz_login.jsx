import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Checkbox, FormControlLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';
import SailingIcon from '@mui/icons-material/Sailing';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Quiz_login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const [inputValues, setInputValues] = useState({
    name: '',
    mobile: '',
    email: '',
    password: ''
  },);
  let history = useHistory();
  const [alert, setAlert] = useState({ show: false, alert: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {

      let res = await axios.post('https://quiz-backend-s.onrender.com/user/login', inputValues);

      localStorage.setItem('token', res.data.token);
      let userExists = res.data.data?.name;

      if (userExists) {

        toast.success(res.data.message);

        let u = setInterval(() => {

          history.push({ pathname: '/home', state: 0 });
          clearInterval(u)
        }, 1000);

      } else {
        toast.error(res.data.message);
      };

    } catch (error) {
      toast.error("Something went wrong");
    }

  }
  const handleSignUp = async (e) => {

    e.preventDefault();

    if (!inputValues.name) {
      toast.error("Name is required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!inputValues.email) {
      toast.error("Email is required");
      return;
    }
    if (!emailRegex.test(inputValues.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!inputValues.password) {
      toast.error("Password is required");
      return;
    }

    if (!inputValues.mobile) {
      toast.error("Mobile number is required");
      return;
    }
    if (inputValues.mobile.length != 10) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    if (inputValues.mobile.length < 10) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    try {
      let res = await axios.post('https://quiz-backend-s.onrender.com/signup', inputValues);
      console.log(res.data);


      if (res.data.message == "User already exists") {
        toast.error(res.data.message);
        return;
      } else {
        toast.success(res.data.message);
      }

      let u = setInterval(() => {

        window.location.reload();
        clearInterval(u)
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during signup');
    }
  };


  return (
    <div className='login-h-100 d-flex align-items-center '>


      <Container maxWidth="xs" className='border px-5 py-4 rounded' sx={{ borderColor: '#00fb54 !important' }}>
        <Box sx={{ mt: 0 }}>
          <Typography style={{ fontSize: "26px", fontWeight: "700", color: 'white' }} className='text-center mb-2 jost d-flex  gap-3'> <SailingIcon sx={{ fontSize: '35px' }} />Welcome To Quizaria  </Typography>
          <Typography variant="h4" component="h1" className='text-center' gutterBottom sx={{ color: 'white' }}>
            {isSignIn ? 'Log in' : 'Sign up'}
          </Typography>

          <div id="Errorred" className={alert.show ? "d-block" : "d-none"}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity={alert.alert}>
                <AlertTitle>{alert.alert}</AlertTitle>
                {alert.message}
              </Alert>
            </Stack>
          </div>
          <form onSubmit={isSignIn ? handleSignIn : handleSignUp}>
            {!isSignIn && (
              <>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={inputValues.name}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: { color: 'white' }
                  }}
                  InputLabelProps={{
                    sx: { color: 'white' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: inputValues.name ? '#00fb54' : '#00fb54',
                      },
                      '&:hover fieldset': {
                        borderColor: '#00fb54',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00fb54',
                      },
                    },

                  }}
                />
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="mobile"
                  value={inputValues.mobile}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: { color: 'white' }
                  }}
                  InputLabelProps={{
                    sx: { color: 'white' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: inputValues.mobile ? '#00fb54' : '#00fb54',
                      },
                      '&:hover fieldset': {
                        borderColor: '#00fb54',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00fb54',
                      },
                    },
                  }}
                />

              </>
            )}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={inputValues.email}
              onChange={handleInputChange}
              InputProps={{
                sx: { color: 'white' }
              }}
              InputLabelProps={{
                sx: { color: 'white' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: inputValues.email ? '#00fb54 ' : '#00fb54 ',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00fb54 ',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00fb54 ',
                  },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              value={inputValues.password}
              onChange={handleInputChange}
              InputProps={{
                sx: { color: 'white' }
              }}
              InputLabelProps={{
                sx: { color: 'white' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: inputValues.password ? '#00fb54' : '#00fb54',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00fb54',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00fb54',
                  },
                },

              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  sx={{
                    color: 'white',
                    '&.Mui-checked': {
                      color: '#00fb54',
                    }
                  }}
                />

              }
              label="Agree to terms and conditions"
              sx={{ color: 'white' }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#00fb54', color: 'black' }}>
              {isSignIn ? 'Log in' : 'Sign Up'}
            </Button>
          </form>
          <Typography sx={{ mt: 2, color: 'white' }} >
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <Button onClick={() => { setIsSignIn(!isSignIn) }} >
              {isSignIn ? 'Sign Up' : 'Log in'}
            </Button>
          </Typography>
        </Box>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Quiz_login