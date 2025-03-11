import * as React from 'react';
import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SailingIcon from '@mui/icons-material/Sailing';


import {
  Link
} from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const pages = ['Home', 'About'];


function Quiz_Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  let History = useHistory()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  function LoginUser() {
    
    localStorage.removeItem("token");
   
    History.push('/');
  }
  return (
    <AppBar position="static" className="appBar-animated apdu-Header" sx={{ backgroundColor: '#00fb54', color: '#1D1D1D' }}>
      <Container maxWidth="xl ">
        <Toolbar disableGutters className="d-flex align-items-center justify-content-center">
          <marquee behavior="alternate" direction="right" scrollamount="10" className="position-absolute">
            <div className='d-flex'>

              <SailingIcon className=" swimming-icon" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '35px' }} />
              <SailingIcon className=" swimming-icon" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '25px' }} />
            </div>
          </marquee>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '23px'
            }}
          >
            QUIZARIA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <Link to={`/${page}`} key={page}>

                  <MenuItem key={page} onClick={handleCloseNavMenu} className="menu-item-animated">
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <SailingIcon className="logo-animated" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            QUIZARIA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className="d-flex gap-3 justify-content-center">
            {pages.map((page) => (
              <Link to={`/${page}`} key={page}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', fontWeight: '600', fontSize: '16px', color: '#1D1D1D' }}
                  className="menu-item-animated"
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          
            
                <Button
                 onClick={() => LoginUser()}
                  className="border border-dark rounded text-dark fw-6 px-4 Btn_hover fw-bold menu-item-animated"
                  sx={{ textTransform: 'capitalize' }}
                >
                  Logout
                </Button>
           
          <Box className="px-2">
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
}

export default Quiz_Header;
