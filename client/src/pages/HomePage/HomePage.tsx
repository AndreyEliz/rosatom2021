import { API_URL, BASE_URL } from 'config';
import React, { useEffect } from 'react';
import { post, get } from 'sfapi';
import { BarChart } from '../../components/charts/bar/Bar';
import { LineChart } from '../../components/charts/line/Line';
import { Brief } from './brief/Brief';
import type { Person } from '../../store/models/types';
import { SankeyChart } from '../../components/charts/sankey/SankeyChart';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, Select, MenuItem, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
    },
}));


const HomePage: React.FC = () => {
    const [data, setData] = React.useState<Person[]>([])
    const [fired, setFired] = React.useState<Person[]>([])
    const [date, setDate] = React.useState()
    const [education, setEducation] = React.useState()
    const [hasMentor, setHasMentor] = React.useState<undefined | string>("")

    const classes = useStyles()
    
    useEffect(() => {
        // post(`${BASE_URL}/api/data`, {
        //     month: date,
        //     Position: education,
        //     HasMentor: hasMentor
        // }).then((data:any) => {
        //     setData(data)
        // })
        // post(`${BASE_URL}/api/fired`, {
        //     month: date,
        //     Position: education,
        //     HasMentor: hasMentor
        // }).then((data:any) => {
        //     setFired(data)
        //     console.log(data)
        // })
        // get(`${API_URL}/RosAtom/GetByMonth/${date}`).then((data) => setData(data))
        // get(`${API_URL}/RosAtom/GetAll`, {EndDate}).then((data: Person[]) => setData(data))
        get(`${API_URL}/RosAtom/GetByFilter`, {
            IsWorking: "false",
            HasMentor: hasMentor ? `${hasMentor === 'yes'}`: undefined,
            Month: date,
            Position: education,
        }).then((data: any) => {
            setFired(data.Res)
        })
    }, [date, hasMentor, education]);
    
    // const current = fired.length / data.length;

    const handleMonthChange = (e:any) => {
        setDate(e.target.value);
    }
    const handleEducationChange = (e:any) => {
        setEducation(e.target.value);
    }
    const handleMentorChange = (e:any) => {
        setHasMentor(e.target.value);
    }

    const dataByMonth = Object.values(fired).map((month:any, index) => {
        const positions:any = {
            1: 0,
            2: 0,
            3: 0,
        }
        month.forEach((person:Person) => {
            positions[person.Position]++
        })
        return {
            Position1: positions[1],
            Position2: positions[2],
            Position3: positions[3],
            Month: index.toString()
        }
    });
    
    const firedArray:any[] = Object.values(fired);
    const firedFlatten = [].concat(...firedArray)

    return (
    <div className={classes.wrapper}>
        <FormControl>
            <InputLabel>Месяц</InputLabel>
            <Select
                value={date}
                label="Месяц"
                onChange={handleMonthChange}
            >
                <MenuItem value={undefined}>---</MenuItem>
                <MenuItem value={0}>Январь</MenuItem>
                <MenuItem value={1}>Февраль</MenuItem>
                <MenuItem value={2}>Март</MenuItem>
                <MenuItem value={3}>Апрель</MenuItem>
                <MenuItem value={4}>Май</MenuItem>
                <MenuItem value={5}>Июнь</MenuItem>
                <MenuItem value={6}>Июль</MenuItem>
                <MenuItem value={7}>Август</MenuItem>
                <MenuItem value={8}>Сентябрь</MenuItem>
                <MenuItem value={9}>Октябрь</MenuItem>
                <MenuItem value={10}>Ноябрь</MenuItem>
                <MenuItem value={11}>Декабрь</MenuItem>
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel>Образование</InputLabel>
            <Select
                value={date}
                label="Образование"
                onChange={handleEducationChange}
            >
                <MenuItem value={undefined}>Любое</MenuItem>
                <MenuItem value={1}>Среднее</MenuItem>
                <MenuItem value={2}>Среднее специальное</MenuItem>
                <MenuItem value={3}>Высшее</MenuItem>
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel>Ментор</InputLabel>
            <Select
                value={hasMentor}
                label="Ментор"
                onChange={handleMentorChange}
            >
                <MenuItem value={""}>Не важно</MenuItem>
                <MenuItem value={"yes"}>Есть</MenuItem>
                <MenuItem value={"no"}>Нет</MenuItem>
            </Select>
        </FormControl>
        {/* <Brief data={current}/> */}
        <BarChart data={dataByMonth}/>
        {/* <LineChart data={undefined} /> */}
        <SankeyChart total={data.length} fired={firedFlatten} />
    </div>   
    );
}

export default HomePage;