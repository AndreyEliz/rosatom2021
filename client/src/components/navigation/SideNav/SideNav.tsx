import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { useLocation } from 'hooks/router.hooks';

interface SideNavProps {
    onClose(): void;
}

const useStyles = makeStyles((theme:any) => ({
    drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));


const SideNav: React.FC<SideNavProps> = ({onClose}) => {
    const classes = useStyles();
    const theme = useTheme();
    const {navigate} = useLocation();

    return (
    <>
        <div className={classes.drawerHeader}>
            <IconButton onClick={onClose}>
                {theme.direction !== 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>
        <Divider />
        <List component="nav" >
            <ListItem button onClick={() => navigate('/sandbox')}>
                <ListItemText primary="Песочница" />
            </ListItem>
        </List>
    </>
    );
};

export default SideNav
