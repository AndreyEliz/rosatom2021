import { API_URL, BASE_URL } from 'config';
import React, { useEffect } from 'react';
import { post, get } from 'sfapi';
import { BarChart } from '../../components/charts/bar/Bar';
import { Pie } from '../../components/charts/Pie/Pie';
import type { Person } from '../../store/models/types';
import { SankeyChart } from '../../components/charts/sankey/SankeyChart';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, Select, MenuItem, Theme, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "20%"
    },
    charts: {
        display: "flex",
        flexDirection: "row",
        width: "70%"
    }, buttons: {
        margin: "auto",
        marginTop: "1rem",
    },
}));


const HomePage: React.FC = () => {
    const [data, setData] = React.useState<Person[]>([])
    const [fired, setFired] = React.useState<Person[]>([])
    const [date, setDate] = React.useState()
    const [education, setEducation] = React.useState()
    const [oldYoung, setOldYoung] = React.useState<Person[]>([])
    const [hasMentor, setHasMentor] = React.useState<undefined | string>("")
    const [maritalStatuses, setMaritalStatuses] = React.useState<undefined | string>("")
    const [sex, setSex] = React.useState<undefined | string>("")
    const [rateFrom, setRateFrom] = React.useState<undefined | string >("")
    const [isYoung, setYoung] = React.useState<undefined | string >("")
    const [countOfChildren, setCountOfChildren] = React.useState<undefined | string >("")
    const [rateChanged, setrateChanged]= React.useState<undefined | string >("")

    const classes = useStyles()
    
    useEffect(() => {
        const filterParams = {
            IsWorking: "false",
            HasMentor: hasMentor ? `${hasMentor === 'yes'}`: undefined,
            Month: date,
            Position: education,
            MaritalStatus: maritalStatuses ? maritalStatuses : undefined,
            Sex: sex ? sex : undefined,
            RateFrom: rateFrom ? rateFrom : undefined,
            IsCountOfChildrenChange: countOfChildren ? countOfChildren : undefined,
            IsRateChange: rateChanged ? rateChanged : undefined
        }
        get(`${API_URL}/RosAtom/GetByFilter`, filterParams).then((data: any) => {
            setFired(data.Res)
            console.log(data)
        })
        get(`${API_URL}/RosAtom/GetByFilterArr`, filterParams).then((data: any) => {
            setOldYoung(data.Res)
            console.log(data)
        })
    }, [date, hasMentor, education, maritalStatuses, sex, rateFrom, isYoung, countOfChildren, rateChanged]);
    

    const handleMonthChange = (e:any) => {
        setDate(e.target.value);
        setCountOfChildren("false");
        setrateChanged("false");
    }
    const handleEducationChange = (e:any) => {
        setEducation(e.target.value);
        setCountOfChildren("false");
        setrateChanged("false");
    }
    const handleMentorChange = (e:any) => {
        setHasMentor(e.target.value);
        setCountOfChildren("false");
        setrateChanged("false");
    }

    const handleMaritalStatusesChange = (e: any) => {
        setMaritalStatuses(e.target.value);
        setCountOfChildren("false");
        setrateChanged("false");
    }

    const handleYoungChange = (e: any) => {
        setYoung(e.target.value);
        setCountOfChildren("false");
        setrateChanged("false");
    }

    const handlerSexChange = (e: any) => {
        setSex(e.target.value);
        setCountOfChildren("false");
        setrateChanged("false");
    }

    const handlerRateChange = (e: any) => {
        setRateFrom(e.target.value);
        setCountOfChildren("false");
        setrateChanged("false");
    }

    const handlerYoungMentorClick = () => {
        setHasMentor("yes");
        setYoung("true");
        setCountOfChildren("false");
        setrateChanged("false");
    }

    const handlerYoungWithOutMentorClick = () => {
        setHasMentor("no");
        setYoung("true");
        setCountOfChildren("false");
        setrateChanged("false");
    }

    const handlerCountOfChildrenClick = () => {
        setHasMentor(undefined);
        setEducation(undefined);
        setMaritalStatuses(undefined); 
        setSex(undefined); 
        setRateFrom(undefined); 
        setYoung(undefined);
        setRateFrom(undefined);
        setrateChanged("false");
        setCountOfChildren("true");
    }

    const handlerRateChangedClick = () => {
        setHasMentor(undefined);
        setEducation(undefined);
        setMaritalStatuses(undefined); 
        setSex(undefined); 
        setRateFrom(undefined); 
        setYoung(undefined);
        setRateFrom(undefined);
        setCountOfChildren(undefined);
        setrateChanged("true");
    }

    const handlerReset =() => {

        setHasMentor(undefined);
        setEducation(undefined);
        setMaritalStatuses(undefined); 
        setSex(undefined); 
        setRateFrom(undefined); 
        setYoung(undefined);
        setRateFrom(undefined);
        setCountOfChildren(undefined);
        setrateChanged(undefined);
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

    const youngCount = oldYoung.filter(x=> x.IsYoung).length;
    const oldYoungData = [
        {
          "id": "Old",
          "label": "??????????????",
          "value": oldYoung.length - youngCount,
          "color": "hsl(10, 70%, 50%)"
        },
        {
          "id": "Young",
          "label": "??????????????",
          "value": youngCount,
          "color": "hsl(267, 70%, 50%)"
        }
      ];

    return (
        <>
    <div className={classes.wrapper}>
        <div className={classes.form}>
        <FormControl>
            <InputLabel>??????????</InputLabel>
            <Select
                value={date}
                label="??????????"
                onChange={handleMonthChange}
            >
                <MenuItem value={undefined}>---</MenuItem>
                <MenuItem value={0}>????????????</MenuItem>
                <MenuItem value={1}>??????????????</MenuItem>
                <MenuItem value={2}>????????</MenuItem>
                <MenuItem value={3}>????????????</MenuItem>
                <MenuItem value={4}>??????</MenuItem>
                <MenuItem value={5}>????????</MenuItem>
                <MenuItem value={6}>????????</MenuItem>
                <MenuItem value={7}>????????????</MenuItem>
                <MenuItem value={8}>????????????????</MenuItem>
                <MenuItem value={9}>??????????????</MenuItem>
                <MenuItem value={10}>????????????</MenuItem>
                <MenuItem value={11}>??????????????</MenuItem>
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel>??????????????????????</InputLabel>
            <Select
                value={date}
                label="??????????????????????"
                onChange={handleEducationChange}
            >
                <MenuItem value={undefined}>??????????</MenuItem>
                <MenuItem value={1}>??????????????</MenuItem>
                <MenuItem value={2}>?????????????? ??????????????????????</MenuItem>
                <MenuItem value={3}>????????????</MenuItem>
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel>????????????</InputLabel>
            <Select
                value={hasMentor}
                label="????????????"
                onChange={handleMentorChange}
            >
                <MenuItem value={""}>???? ??????????</MenuItem>
                <MenuItem value={"yes"}>????????</MenuItem>
                <MenuItem value={"no"}>??????</MenuItem>
            </Select>
        </FormControl>

        <FormControl>
            <InputLabel>???????????????? ??????????????????</InputLabel>
            <Select
                value={maritalStatuses}
                label="???????????????? ??????????????????"
                onChange={handleMaritalStatusesChange}
            >
                <MenuItem value={undefined}>??????????</MenuItem>
                <MenuItem value={"1"}>????????.</MenuItem>
                <MenuItem value={"2"}>??????/????</MenuItem>
                <MenuItem value={"3"}>????????.</MenuItem>
                <MenuItem value={"4"}>??????/????</MenuItem>
                <MenuItem value={"5"}>????????????</MenuItem>
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel>??????</InputLabel>
            <Select
                value={sex}
                label="??????"
                onChange={handlerSexChange}
            >
                <MenuItem value={undefined}>??????????</MenuItem>
                <MenuItem value={"??????????????"}>??????????????</MenuItem>
                <MenuItem value={"??????????????"}>??????????????</MenuItem>
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel>???????????????? ????:</InputLabel>
            <Select
                value={rateFrom}
                label="???????????????? ????:"
                onChange={handlerRateChange}
            >
                <MenuItem value={undefined}>??????????</MenuItem>
                <MenuItem value={"5000.00"}>5,000.00</MenuItem>
                <MenuItem value={"10000.00"}>10,000.00</MenuItem>
                <MenuItem value={"20000.00"}>20,000.00</MenuItem>
                <MenuItem value={"40000.00"}>40,000.00</MenuItem>
                <MenuItem value={"80000.00"}>80,000.00</MenuItem>
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel>????????:</InputLabel>
            <Select
                value={isYoung}
                label="????????:"
                onChange={handleYoungChange}
            >
                <MenuItem value={undefined}>??????????</MenuItem>
                <MenuItem value={"true"}>??????????????</MenuItem>
                <MenuItem value={"false"}>??????????????</MenuItem>
            </Select>
        </FormControl>

        </div>

        <div className={classes.charts}>
            <div style={{width: "50%"}}>{oldYoungData.length && <Pie data={oldYoungData}/>}</div>
            {/* <Brief data={current}/> */}
            {dataByMonth.length && <BarChart data={dataByMonth}/>}            
        </div>
        <div className={classes.buttons}>
            <ButtonGroup orientation="horizontal">
                {dataByMonth.length && <Button onClick={handlerReset}>???????????????? ??????????????</Button>}
                {dataByMonth.length  && <Button onClick={handlerYoungMentorClick}>?????????????? ?? ??????????????????????</Button>}
                {dataByMonth.length  && <Button onClick={handlerYoungWithOutMentorClick}>?????????????? ?????? ????????????????????</Button>}
                {dataByMonth.length && <Button onClick={handlerCountOfChildrenClick}>???????????????????? ???????????????????? ??????????</Button>}
                {dataByMonth.length && <Button onClick={handlerRateChangedClick}>???????????????? ????????????????</Button>}
            </ButtonGroup>
        </div>
        
        {/* <LineChart data={undefined} /> */}
    </div>
    {firedFlatten.length && <SankeyChart total={data.length} fired={firedFlatten} />}
    </>
    );
}

export default HomePage;
