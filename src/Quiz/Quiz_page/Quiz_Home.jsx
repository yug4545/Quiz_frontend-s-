import React, { useEffect, useRef, useState } from 'react'
import Quiz_Header from '../Quiz_component/Quiz_Header'
import Herovideo from '../Quiz_video/char.mp4'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
    Link
} from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { logDOM } from '@testing-library/dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Quiz_Home = () => {

    const [open, setOpen] = React.useState(false);

    let [button, setbutton] = useState([]);
    let [category, setcategory] = useState([]);
    let [Searchitem, setSearchitem] = useState('');
    let [sub_category, setsub_category] = useState(null)


    let getcategory = async () => {
        try {
            let res = await axios.get('https://quiz-backend-s.onrender.com/category/read')
            setcategory(res.data.data)

        } catch (error) {
            console.log(error);
        }
    }


    let History = useHistory();

    function Subcategory(categoryitem) {

        let subcategory = category.find(item => item.category === categoryitem)?.subcategory || [];

        let Btn = subcategory?.map((item) => (
            <Link
                to={{
                    pathname: '/game',
                    state: { item },
                }}
                key={item}
            >
                <Button className='p-1 btn-pop Btn_hover px-3 nevbar-btn'>
                    {item}
                </Button>
            </Link>
        ));

        setbutton(Btn);
    }

    const handleClickOpen = (Feild) => {
        setOpen(true);
        let Btn;
        if (Feild === 'Categorys') {
            Btn = category.map((item, i) => (
                <Button className='p-1 btn-pop Btn_hover px-3 nevbar-btn' onClick={() => Subcategory(item.category)} key={i}>{item.category}</Button>
            ));
        } else {
            let subcategory = category.find(item => item.category === Feild)?.subcategory || [];

            Btn = subcategory?.map((item, i) => (
                <Link to={{ pathname: '/game', state: { item } }} key={i}>
                    <Button className='p-1 btn-pop Btn_hover px-3 nevbar-btn' >{item}</Button>
                </Link>
            ));
        }

        setbutton(Btn);
    };
    const handleClose = () => {
        setOpen(false);
    };

   

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            History.push('/');
        } else {
            getcategory();
        }
    }, []);

    return (
        <div >
            <div>
                <Quiz_Header />
            </div>
            <div className="w-100 nevbar animate-navbar p-2 d-flex gap-5 px-4">
                <div className="d-flex align-items-center gap-4 overflow-auto w-autto custom-scrollbar" >
                    {category.map((item, i) => (
                        i <= 11 ? <Button
                            onClick={() => handleClickOpen(item.category)}
                            className={
                                item.category.toLowerCase() === Searchitem.toLowerCase()
                                    ? "Search-btn p-1 Btn_hover px-3 nevbar-btn"
                                    : "p-1 Btn_hover px-3 nevbar-btn"
                            }
                            key={i}
                        >
                            {item.category}
                        </Button>:null

                    ))}
                </div>

                <Button className="p-1 Btn_hover px-3 nevbar-btn" onClick={()=> handleClickOpen('Categorys')}>
                    All
                    <ArrowDropDownIcon
                        sx={{
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease-in-out',
                        }}
                    />
                </Button>

                <div className="d-flex justify-content-end " style={{ position: "relative" }}>
                    <input
                        type="text"
                        value={Searchitem}
                        onChange={(e) => setSearchitem(e.target.value)}
                        className="w-100 rounded animate-input ps-2 bg-transparent"
                        placeholder="Search Category"
                    />
                    <SearchIcon sx={{ color: "#37fa78", height: "35px", position: "absolute", right: "12px", cursor: "pointer" }} />
                </div>
            </div>
            <div className=' hero-video-h-90 d-flex' style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '90vh' }}>
                <div className='w-40  d-flex align-items-cente flex-column justify-content-center gap-4'>
                    <h1 className='ps-5 animated-text'>Test your knowledge and beat the clock !</h1>
                    <p className='ps-5 animated-text delay-1'>Challenge yourself with hundreds of questions across multiple categories. Compete with friends, climb the leaderboard, and prove you're the ultimate quiz master!</p>
                    <React.Fragment>
                        <Button variant="outlined" onClick={() => handleClickOpen('Categorys')} className="btn ms-5 w-25 mt-3 btn-attractive animated-text delay-2 text-light">Start Quiz</Button>

                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#00fb54" }} id="customized-dialog-title">
                                Select Categroy
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={(theme) => ({
                                    position: 'absolute',
                                    right: 8,
                                    top: 13,
                                    color: 'black',
                                })}
                            >
                                <CloseIcon />
                            </IconButton>
                            <DialogContent dividers sx={{ width: 'fit-content', backgroundColor: '#394937' }} className='d-flex '>
                                <div className='d-flex justify-content-center flex-wrap gap-3' id='c'>
                                    {button}
                                </div>

                            </DialogContent>
                        </BootstrapDialog>
                    </React.Fragment>
                </div>
                <div className='w-60 d-flex align-items-center  justify-content-center'>
                    <video autoPlay loop muted height={"90%"} width={"100%"}>
                        <source src={Herovideo} type="video/mp4" />
                    </video>
                </div>

            </div>


        </div>
    )
}

export default Quiz_Home
