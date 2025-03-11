import React, { useState } from 'react';
import { Box, Button, Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const History = useHistory();
  const [isSignIn, setIsSignIn] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false); // Loader state

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      // Validation check for empty fields
      if (!values.email) {
        toast.error("Please enter your email.");
        return;
      }
      if (!values.password) {
        toast.error("Please enter your password.");
        return;
      }

      
      try {
        setLoader(true);
        let res = await axios.post("https://quiz-backend-s.onrender.com/admin/login", values);

        localStorage.setItem("Token", res.data.token);

        let userExists = res.data?.data;

        if (userExists) {
          toast.success(res.data.message);

          // Redirect to dashboard after 1 second
          setTimeout(() => {
            History.push("/Addmin/Dashboard");
          }, 1000);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred, please try again.");
      } finally {
        setLoader(false); // Hide loader after API response
      }
    },
  });

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1d1d1d' }}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ width: '444px', border: '3px solid #00fb54', padding: '40px 30px', borderRadius: '10px' }} className="d-flex flex-column gap-3">

          <Typography variant='h4' className='d-flex justify-content-center' sx={{ color: '#00fb54' }}>
            {isSignIn ? "Login" : "Sign up"}
          </Typography>

          <TextField
            id="outlined-basic"
            fullWidth label="Email"
            variant="outlined"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            InputLabelProps={{
              sx: { color: 'whitesmoke' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#00FB54' },
                '& input': { color: 'white' },
                '&:hover fieldset': { borderColor: '#00FB54' },
                '&.Mui-focused fieldset': { borderColor: '#00FB54' },
              },
            }}
          />
          <TextField
            id="outlined-basic"
            fullWidth label="Password"
            variant="outlined"
            name="password"
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            InputLabelProps={{
              sx: { color: 'whitesmoke' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#00FB54' },
                '& input': { color: 'white' },
                '&:hover fieldset': { borderColor: '#00FB54' },
                '&.Mui-focused fieldset': { borderColor: '#00FB54' },
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
                  },
                }}
              />
            }
            label="Agree to terms and conditions"
            sx={{ color: 'white' }}
          />
          <Button
            variant='contained'
            fullWidth
            type="submit"
            sx={{ backgroundColor: '#00fb54', color: '#1d1d1d' }}
            disabled={loader} // Disable button when loading
          >
            {loader ? <PacmanLoader color="#00fb54" size={20} /> : (isSignIn ? "Login" : "Sign up")}
          </Button>

        </Box>
      </form>

      <ToastContainer />
    </Box>
  );
};

export default Login;
