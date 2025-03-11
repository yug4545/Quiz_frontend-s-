import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddCardIcon from '@mui/icons-material/AddCard';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Link, useLocation } from 'react-router-dom';
import { Button, Tooltip } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Question from './Question';

const drawerWidth = 240;

const openedMixin = (theme) => ({

    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

const Addmin_page = (props) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [loader, setloader] = useState(true);
    const location = useLocation();
    const History = useHistory();


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const Page = [
        {
            name: 'Dashboard',
            path: '/Addmin/Dashboard',
            icon: <SpaceDashboardIcon />
        },
        {
            name: 'Category',
            path: '/Addmin/Category',
            icon: <CategoryIcon />
        },
        {
            name: 'Question',
            path: '/Addmin/Question',
            icon: <QuestionAnswerIcon />
        }
    ]
    function Logout() {
        localStorage.removeItem("Token");
        History.push("/");
    }

    function AddAdmin() {
        History.push("/Signup");
    }

    useEffect(() => {
        try {
            if (!localStorage.getItem("Token")) {
                setloader(true);
                History.push("/");
            }

        } catch (error) {

        } finally {
            setloader(false);
        }

    }, [])


    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} >
                    <Toolbar sx={{ backgroundColor: '#00fb54' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    marginRight: 5,
                                },
                                open && { display: 'none' },
                            ]}
                            style={{ color: '#1d1d1d' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" className='w-100 d-flex justify-content-between align-items-center'>
                            {Page.map((e, index) => {
                                return e.path == location.pathname ? <Typography className='text-dark' key={index}>{e.name == "Dashboard" ? "Dashboard" : `Dashboard / ${e.name}`}</Typography> : ''
                            })}

                            <Box className="d-flex gap-2">
                                        <Tooltip title="Add admin" arrow>
                                            <Button
                                                className="text-light gap-3"
                                                onClick={() => AddAdmin()}
                                                sx={{
                                                    backgroundColor: '#4CAF50',
                                                    borderRadius: '8px',
                                                    padding: '10px',
                                                }}
                                            >
                                                <AddIcon sx={{ fontSize: '25px', color: '#fff' }} />
                                            </Button>
                                        </Tooltip>
                                <Tooltip title="Logout" arrow>
                                    <Button
                                        className="text-light gap-3"
                                        onClick={() => Logout()}
                                        sx={{
                                            backgroundColor: '#F44336',
                                            borderRadius: '8px',
                                            padding: '10px',
                                        }}
                                    >
                                        <MeetingRoomIcon sx={{ fontSize: '25px', color: '#fff' }} />
                                    </Button>
                                </Tooltip>
                            </Box>



                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} >
                    <DrawerHeader sx={{ backgroundColor: '#00fb54' }} className='d-flex justify-content-evenly align-items-center'>

                        <Typography variant='h5' className='text-dark'>Admin page</Typography>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ color: '#1d1d1d' }} />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List className='p-2'>
                        {Page.map((e, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <Link to={e.path} className='text-decoration-none text-dark' >
                                    <ListItemButton

                                        id='Button'
                                        className={`rounded  my-3  ${location.pathname === e.path ? 'Active-Category' : 'text-light Demo'}`}
                                        sx={[
                                            {
                                                minHeight: 48,
                                                px: 2.5,
                                            },
                                            open
                                                ? {
                                                    justifyContent: 'initial',
                                                }
                                                : {
                                                    justifyContent: 'center',
                                                },
                                        ]}
                                    >
                                        <ListItemIcon
                                            sx={[
                                                {
                                                    minWidth: 0,
                                                    justifyContent: 'center',
                                                    color: location.pathname == e.path ? '#1d1d1d' : 'white'
                                                },
                                                open
                                                    ? {
                                                        mr: 4,
                                                    }
                                                    : {
                                                        mr: 'auto',
                                                    },
                                            ]}

                                        >

                                            {e.icon}

                                        </ListItemIcon>
                                        <ListItemText

                                            primary={e.name}
                                            sx={[
                                                open
                                                    ? {
                                                        opacity: 1,
                                                    }
                                                    : {
                                                        opacity: 0,
                                                    },
                                            ]}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {props.children}
                </Box>
            </Box>

        </div>
    )
}


export default Addmin_page
