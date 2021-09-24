import React, { ReactElement, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme } from '@material-ui/core/styles';

interface CardCustomProps {
    title?: string | ReactElement;
    defaultOpen?: boolean;
    className?: any;
    avatar?: any;
    collapsable?: boolean;
    noHeader?: boolean;
}

const useStyles = makeStyles((theme:Theme) => ({
    customCard: {
        margin: 20,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    header: {
        fontSize: '1.2rem',
    }
}));

const CardCustom: React.FC<CardCustomProps> = ({
    title,
    avatar,
    className,
    defaultOpen = true,
    collapsable = true,
    noHeader = false,
    ...props
}) => {
    const [expanded, setExpanded] = React.useState(defaultOpen);

    useEffect(() => {
        setExpanded(defaultOpen);
    }, [defaultOpen]);

    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const wrapperClass = clsx(classes.customCard, className);

    return (
        <Card className={wrapperClass}>
            {!noHeader &&
            <CardHeader
                avatar={avatar}
                action={
                    collapsable ?
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    : undefined
                }
                title={<span className={classes.header}>{title}</span>}
            />}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {props.children}
            </Collapse>
        </Card>
    );
};

export default CardCustom;
