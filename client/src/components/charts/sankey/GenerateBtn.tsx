import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Popper } from '@material-ui/core';
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

type props = {
    onYong: () => void;
    onMentor: () => void;
    onMentorHE: () => void;
}

const options = ['С Ментором', 'Молодые специалисты', 'Специалисты с высшим образованием и с Ментором'];

export const GenerateBtn: React.FC<props> = ({
    onYong,
    onMentor,
    onMentorHE
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);


  const handleMenuItemClick = (event: any, index: number) => {
    setOpen(false);
    if(index === 0) onYong()
    if(index === 0) onMentor()
    if(index === 0) onMentorHE()
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" color="secondary" ref={anchorRef} >
        <Button onClick={handleToggle}>Сгенерировать Диаграмму Путей</Button>
        <Button
          size="small"
          aria-controls={open ? 'button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={false}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
