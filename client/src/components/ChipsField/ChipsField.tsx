import React from 'react';
import Chip from '@material-ui/core/Chip';
import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    wrapperChips: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

interface IChipsField {
    options: string[];
    color?: 'primary' | 'secondary' | 'default';
}

const ChipsField = ({ options, color = 'primary' }: IChipsField) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapperChips}>
            {options.map((option: string, idx: number) => (
                <Chip
                    key={idx}
                    label={option}
                    color={color}
                    variant="outlined"
                    size="small"
                />
            ))}
        </div>
    );
};

export default ChipsField;
