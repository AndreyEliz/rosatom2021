import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loading from 'components/Loading/Loading';
import Drawer from '@material-ui/core/Drawer';
import SideNav from 'components/navigation/SideNav/SideNav';
import AppTopBar from 'components/navigation/AppTopBar/AppTopBar';
import Pages from 'routing/Pages';

const drawerWidth = 240;

const useStyles = makeStyles((theme:any) => ({
	root: {
	},
    drawer: {
		width: drawerWidth,
		flexShrink: 0,
    },
    drawerPaper: {
      	width: drawerWidth,
    },
    drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
    },
    content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: 0,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: drawerWidth,
	  },
  }));

const MainLayout: React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
	<React.Suspense fallback={<Loading />}>
		<div className={classes.root}>
			<CssBaseline />
			<AppTopBar handleDrawerOpen={handleDrawerOpen} open={open}/>
			<main className={clsx(classes.content, {
				[classes.contentShift]: open,
			})}>
				<div className={classes.drawerHeader} />
				<Pages/>
			</main>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<SideNav onClose={handleDrawerClose} />
			</Drawer>
		</div>
	</React.Suspense>
    );
}

export default MainLayout