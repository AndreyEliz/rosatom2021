import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PrintIcon from '@material-ui/icons/Print';
import { useLocation } from 'hooks/router.hooks';
import { Button } from '@material-ui/core';

const drawerWidth = 240;

interface AppTopBarProps {
    handleDrawerOpen(): void;
    open: boolean;
}

const useStyles = makeStyles((theme) => ({
    appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
    },
    appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: drawerWidth,
    },
    title: {
          flexGrow: 1,
          marginLeft: '20px'
    },
    hide: {
      	display: 'none',
    },
    print: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        ["@media print"]: {
            display: "none",
        },
    },
  }));

const AppTopBar: React.FC<AppTopBarProps> = ({handleDrawerOpen, open}) => {
    const classes = useStyles();
    const {navigate} = useLocation();

    return (
    <>
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {[classes.appBarShift]: open,})}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerOpen}
                    className={clsx(open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title} onClick={() => navigate('')}>
                    <b> РОС</b>АТОМ
                </Typography>
                <div className={classes.print}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PrintIcon />}
                    onClick={() => window.print()}
                >
                    Печать
                </Button>
                </div>
            </Toolbar>
        </AppBar>
    </>
    );
};

export default AppTopBar
