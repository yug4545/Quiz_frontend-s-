import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners'
import { Checkbox, FormControlLabel } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const History = useHistory();
  const [isSignIn, setIsSignIn] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  let [loader, setloader] = useState(false)

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
        setloader(true);

        let res = await axios.post("http://localhost:3001/admin/signup", values);

        localStorage.setItem("Token", res.data.token)

        let userExists = res.data?.data;

        if (userExists) {
          toast.success(res.data.message);

          let u = setInterval(() => {
            History.push("/Addmin/Dashboard")
            clearInterval(u)
          }, 1000);
        }else{
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloader(false)
      }
    },
  });

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1d1d1d' }}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ width: '444px', border: '3px solid #00fb54', padding: '40px 30px', borderRadius: '10px' }} className="d-flex flex-column gap-3">

          <Typography variant='h4' className='d-flex justify-content-center' sx={{ color: '#00fb54' }}> Sign up</Typography>

          <TextField
            id="outlined-basic"
            fullWidth label="Email"
            variant="outlined"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            InputLabelProps={{
              sx: {
                color: 'whitesmoke',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#00FB54',
                },
                '& input': {
                  color: 'white',
                },
                '&:hover fieldset': {
                  borderColor: '#00FB54',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00FB54',
                },
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
              sx: {
                color: 'whitesmoke',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#00FB54',
                },
                '& input': {
                  color: 'white',
                },
                '&:hover fieldset': {
                  borderColor: '#00FB54',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00FB54',
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
                  '&.Mui-checked': {
                    color: '#00fb54',
                  }
                }}
              />
            }
            label="Agree to terms and conditions"
            sx={{ color: 'white' }}
          />
          <Button variant='contained' fullWidth type="submit" sx={{ backgroundColor: '#00fb54', color: '#1d1d1d' }}>Sign up</Button>
        </Box>
      </form>
      <ToastContainer />
    </Box >
  );
};

export default Signup;
