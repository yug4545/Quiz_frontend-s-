import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Addmin_page from './Addmin_page';
import axios from 'axios';

const Dashboard = () => {
    let [Categorydata, setCategorydata] = useState([]);
    let [SubCategory, setSubCategory] = useState([]);
    let [question, setQuestion] = useState([]);
    let [loading, setLoading] = useState(true);

    let token = localStorage.getItem("Token");

    async function getdata() {
        try {
            setLoading(true);

            let res = await axios.get("http://localhost:3001/category/read");

            let questionRes = await axios.get("http://localhost:3001/question/read");

            setCategorydata(res.data.data);
            setSubCategory(res.data.totalsubcategory);
            setQuestion(questionRes.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    return (
        <div>
            <Addmin_page>
                <Box className="d-flex gap-3 justify-content-evenly" sx={{ marginTop: "65px" }}>
                    
                            <Box className="d-flex flex-column align-items-center justify-content-evenly DashBoard-Box">
                                <Typography variant="h5" sx={{ fontWeight: "700", color: "whitesmoke" }}>Total Category</Typography>
                                <Typography variant="h4" sx={{ fontWeight: "700", color: "whitesmoke", fontSize: "45px" }}>{ loading ? <CircularProgress/>: Categorydata.length}</Typography>
                            </Box>
                            <Box className="d-flex flex-column align-items-center justify-content-evenly DashBoard-Box">
                                <Typography variant="h5" sx={{ fontWeight: "700", color: "whitesmoke" }}>Total Sub Category</Typography>
                                <Typography variant="h4" sx={{ fontWeight: "700", color: "whitesmoke", fontSize: "45px" }}>{loading ? <CircularProgress/>:SubCategory}</Typography>
                            </Box>
                            <Box className="d-flex flex-column align-items-center justify-content-evenly DashBoard-Box">
                                <Typography variant="h5" sx={{ fontWeight: "700", color: "whitesmoke" }}>Total Question & Answer</Typography>
                                <Typography variant="h4" sx={{ fontWeight: "700", color: "whitesmoke", fontSize: "45px" }}>{loading ? <CircularProgress/>:question.length}</Typography>
                            </Box>
                </Box>
            </Addmin_page>
        </div>
    );
};

export default Dashboard;
