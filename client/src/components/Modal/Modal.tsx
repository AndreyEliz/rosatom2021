import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, Select, MenuItem, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface IAlertDialog {
    title: string;
    handleClose():void;
    handleSubmit(data: any): void;
    open:boolean;
    filter?: any;
    handleChange(e:any): void
}

const useStyles = makeStyles((theme:Theme) => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
    },
}));

export const ModalDialog: React.FC<IAlertDialog> = ({title, handleClose, open, handleSubmit, handleChange, filter={
    HasMentor: "",
    Sex: "",
    Position: "",
    MaritalStatus: "",
    Rate: "",
}}) => {
    const classes = useStyles()

    const onSubmit = () => {
        handleSubmit(filter)
    }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <div className={classes.wrapper}>
                <FormControl>
                    <InputLabel>Ментор</InputLabel>
                    <Select
                        name="HasMentor"
                        value={filter.HasMentor?? ""}
                        label="Ментор"
                        onChange={handleChange}
                    >
                        <MenuItem value={""}>Не важно</MenuItem>
                        <MenuItem value={"true"}>Есть</MenuItem>
                        <MenuItem value={"false"}>Нет</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Пол</InputLabel>
                    <Select
                        name="Sex"
                        value={filter.Sex?? ""}
                        label="Пол"
                        onChange={handleChange}
                    >
                        <MenuItem value={""}>Не важно</MenuItem>
                        <MenuItem value={"мужской"}>Мужской</MenuItem>
                        <MenuItem value={"женский"}>Женский</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Образование</InputLabel>
                    <Select
                        name={"Position"}
                        value={filter.Position?? ""}
                        label="Образование"
                        onChange={handleChange}
                    >
                        <MenuItem value={""}>Любое</MenuItem>
                        <MenuItem value={"1"}>Среднее</MenuItem>
                        <MenuItem value={"2"}>Среднее специальное</MenuItem>
                        <MenuItem value={"3"}>Высшее</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Семейное положение</InputLabel>
                    <Select
                        value={filter.MaritalStatus??""}
                        label="Семейное положение"
                        onChange={handleChange}
                    >
                        <MenuItem value={""}>Любое</MenuItem>
                        <MenuItem value={"1"}>Разв.</MenuItem>
                        <MenuItem value={"2"}>Жен/ЗМ</MenuItem>
                        <MenuItem value={"3"}>Вдов.</MenuItem>
                        <MenuItem value={"4"}>Хол/НЗ</MenuItem>
                        <MenuItem value={"5"}>ГрБрак</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Зарплата от:</InputLabel>
                    <Select
                        value={filter.Rate??""}
                        label="Зарплата от:"
                        onChange={handleChange}
                    >
                        <MenuItem value={""}>Любая</MenuItem>
                        <MenuItem value={"5000.00"}>5,000.00</MenuItem>
                        <MenuItem value={"10000.00"}>10,000.00</MenuItem>
                        <MenuItem value={"20000.00"}>20,000.00</MenuItem>
                        <MenuItem value={"40000.00"}>40,000.00</MenuItem>
                        <MenuItem value={"80000.00"}>80,000.00</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary" variant="contained">
            Ок
          </Button>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
