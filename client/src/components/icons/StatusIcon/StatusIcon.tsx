import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import WarningIcon from '@material-ui/icons/Warning';

interface StatusIconProps {
    plan: any;
    className?: any;
}

const useStyles = makeStyles((theme) => ({
    ok: {
        color: theme.palette.success.main,
    },
    warning: {
        color: theme.palette.warning.main,
    },
    error: {
        color: theme.palette.error.main,
    },
}));

const StatusIcon: React.FC<StatusIconProps> = ({plan, className}) => {
    const classes = useStyles();
 
    return (
    <IconButton edge="end" aria-label="status" className={className}>
        {plan.isOk ?
        <CheckCircleOutlineIcon  className={classes.ok}/> 
        :
        plan.status === 'warning' ?
        <WarningIcon className={classes.warning}/> : <CancelIcon className={classes.error}/>}
    </IconButton>
    );
}

export default StatusIcon;