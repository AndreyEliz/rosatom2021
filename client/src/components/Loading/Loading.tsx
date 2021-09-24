import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

interface LoadingProps {
    size?: number;
    color?: string;
    className?: any
}

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        '& > .MuiCircularProgress-root.MuiCircularProgress-colorPrimary': {
            color: (props:any) => props.color,
        }
    }
}));

const Loading: React.FC<LoadingProps> = ({size, color, className}) => {
    const classes = useStyles({color});
    const wrapperClassName = clsx(classes.wrapper, className);

    return (
        <Box className={wrapperClassName}>
            <CircularProgress size={size}/>
        </Box>
    );
}

export default Loading