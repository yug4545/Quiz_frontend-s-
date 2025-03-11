import React, { useEffect, useState } from "react";
import { Box, TextField, Autocomplete, Button, Switch, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Addmin_page from './Addmin_page';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';

const Category = () => {
    let token = localStorage.getItem("Token")
    const [open, setOpen] = React.useState(false);
    let [Category, setCategory] = useState([]);
    let [id, setid] = useState(null);
    let [SearcH, setSearcH] = useState(null);
    let [loader, setloader] = useState(false);
    let [DeleteId, setDeleteId] = useState(-1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const formik = useFormik({
        initialValues: {
            category: '',
            subcategory: [],
        },
        onSubmit: async (values, { resetForm }) => {


            let res;
            
            if (id.length != null) {
                try {
                    res = await axios.patch(`http://localhost:3001/category/update/${id}`,values)
                    console.log("Submit====> " + id);
                    setid(null);
                    getdata();
                } catch (error) {
                    toast.error(error);
                }
            }
            else {
                try {
                    res = await axios.post("http://localhost:3001/category/create", { category: values.category, subcategory: values.subcategory });
                } catch (error) {
                    toast.error(error);

                }
            }
            getdata();
            toast.success(res.data.message)
            resetForm();
            handleClose();
        },
    });

    let getdata = async () => {
        setloader(true);
        try {
            let res = await axios.get("http://localhost:3001/category/read", {
                headers: {
                    Authorization: token
                }
            });
            setCategory(res.data.data)

        } catch (error) {
            console.log(error);

        } finally {
            setloader(false);
        }
    }
    useEffect(() => {
        getdata();
    }, []);


    const handleDeleteClick = (id) => {
        setDeleteDialogOpen(true);
        setDeleteId(id);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    async function Delete() {
        try {
            let res = await axios.delete(`http://localhost:3001/category/delete/${DeleteId}`)
            toast.success(res.data.message)
            getdata();
            setSearcH(null);
        } catch (error) {
            toast.error(error.message);
        }
        setDeleteDialogOpen(false);
    }

    function Search(catagoryName) {
        let searchdata = Category.filter((e) => {
            return e.category === catagoryName;
            ;
        })
        if (searchdata == "") {

            setSearcH(0);
        } else {
            setSearcH(searchdata);

        }
    }

    async function Update(id) {
        setid(id);
        let finddata = Category.find((e) => e._id === id);

        formik.setValues({
            
            category: finddata.category || "",
            subcategory: finddata.subcategory || [],
        });

        setOpen(true);
    }

    return (
        <div >

            <Addmin_page className=" bg-danger">
                <Box className='d-flex justify-content-between mb-4'>
                    <Autocomplete
                        sx={{ width: "82%" }}
                        id="country-select-demo"
                        options={Category.map((e) => e.category)}
                        autoHighlight
                        componentsProps={{
                            paper: {
                                sx: {
                                    backgroundColor: "#1d1d1d",
                                    color: "white",
                                    border: "1px solid #00fb54"
                                }
                            },
                            clearIndicator: {
                                sx: {
                                    color: "white",
                                }
                            },
                            popupIndicator: {
                                sx: {
                                    color: "white"
                                }
                            }
                        }}
                        renderOption={(props, option, { index }) => {
                            const { key, ...optionProps } = props;
                            return (
                                <Box
                                    key={key}
                                    component="li"
                                    sx={{
                                        backgroundColor: index % 2 !== 0 ? "#212529" : "#1d1d1d",
                                        color: "white"
                                    }}
                                    {...optionProps}
                                >
                                    {option}
                                </Box>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search Category"
                                sx={{
                                    "& label": { color: "white" },
                                    "& input": { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#00fb54" },
                                        "&:hover fieldset": { borderColor: "#00fb54" },
                                        "&.Mui-focused": {
                                            "& fieldset": { borderColor: "#00fb54" },
                                            "& input": { color: "white" }
                                        }
                                    }
                                }}
                                slotProps={{
                                    htmlInput: {
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    },
                                }}
                            />
                        )}
                        onChange={(e) => Search(e.target.innerText)}
                    />

                    <React.Fragment>
                        <Button onClick={() => handleClickOpen()} style={{ backgroundColor: '#00fb54', color: '#1d1d1d' }} className='px-5'>
                            Add Category
                        </Button>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle sx={{ backgroundColor: '#00fb54', color: '#1d1d1d' }}>Add Category</DialogTitle>
                            <form onSubmit={formik.handleSubmit}>
                                <DialogContent dividers sx={{ backgroundColor: "#1d1d1d" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 2,
                                            width: "100%",
                                        }}
                                    >
                                        <TextField
                                            id="outlined-basic"
                                            label="Category"
                                            variant="outlined"
                                            autoFocus
                                            required
                                            margin="dense"
                                            type="text"
                                            name="category"
                                            onChange={formik.handleChange}
                                            value={formik.values.category}
                                            InputProps={{
                                                sx: { color: "white" },
                                            }}
                                            InputLabelProps={{
                                                sx: { color: "white" },
                                            }}
                                            sx={{
                                                width: "100%",
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { borderColor: "white" },
                                                    "&:hover fieldset": { borderColor: "white" },
                                                    "&.Mui-focused fieldset": { borderColor: "white" },
                                                },
                                                "& label.Mui-focused": { color: "white" },
                                            }}
                                        />

                                        <TextField
                                            id="outlined-basic"
                                            label="Subcategory (Array)"
                                            variant="outlined"
                                            required
                                            margin="dense"
                                            type="text"
                                            name="subcategory"
                                            onChange={formik.handleChange}
                                            value={formik.values.subcategory}
                                            InputProps={{
                                                sx: { color: "white" },
                                            }}
                                            InputLabelProps={{
                                                sx: { color: "white" },
                                            }}
                                            sx={{
                                                width: "100%",
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { borderColor: "white" },
                                                    "&:hover fieldset": { borderColor: "white" },
                                                    "&.Mui-focused fieldset": { borderColor: "white" },
                                                },
                                                "& label.Mui-focused": { color: "white" },
                                            }}
                                        />

                                        <DialogActions sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <Button type="submit" sx={{ backgroundColor: "#00fb54", color: "#1d1d1d", px: 3 }}>
                                                Submit
                                            </Button>
                                        </DialogActions>
                                    </Box>
                                </DialogContent>
                            </form>
                        </Dialog>
                    </React.Fragment>
                </Box>
                <Box>
                    <div style={{ maxHeight: "550px", overflow: "auto", border: "1px solid #212529" }}>
                        {loader ? (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <table className="w-100 border-collapse rounded-lg text-center">
                                <thead style={{ position: "sticky", top: 0, backgroundColor: "#00fb54", zIndex: 1 }}>
                                    <tr style={{ height: "17px" }}>
                                        {["No", "Category Name", "Subcategory", "Update", "Delete"].map((header) => (
                                            <th key={header} className="text-center p-2" style={{ color: "#1d1d1d", height: "17px" }}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-light">
                                    {(SearcH ? [SearcH[0]] : Category).map((item, i) => (
                                        <tr key={item?._id || i} className={`text-center ${i % 2 === 0 ? 'bg-dark' : ''}`} style={{ height: "17px" }}>
                                            <td className="p-2">{i + 1}</td>
                                            <td className="p-2">{item?.category}</td>
                                            <td className="p-2">{item?.subcategory?.length}</td>
                                            <td className="p-2">
                                                <IconButton onClick={() => Update(item?._id)}>
                                                    <EditIcon sx={{ color: "gray" }} />
                                                </IconButton>
                                            </td>
                                            <td className="p-2">
                                                <IconButton onClick={() => handleDeleteClick(item?._id)}>
                                                    <DeleteIcon sx={{ color: "#F44336" }} />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Delete Confirmation Dialog */}

                    <Dialog
                        open={deleteDialogOpen}
                        onClose={handleDeleteCancel}
                        sx={{
                            "& .MuiPaper-root": {
                                backgroundColor: "#1d1d1d",
                                color: "white"
                            }
                        }}
                    >
                        <DialogTitle sx={{ color: "white" }}>Confirm Deletion</DialogTitle>
                        <DialogContent sx={{ color: "white" }}>
                            Are you sure you want to delete this category?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteCancel}>Cancel</Button>
                            <Button onClick={() => Delete()} sx={{ color: "#F44336" }} autoFocus>Delete</Button>
                        </DialogActions>
                    </Dialog>



                    <ToastContainer />
                </Box>

            </Addmin_page>

        </div>
    )
}

export default Category
