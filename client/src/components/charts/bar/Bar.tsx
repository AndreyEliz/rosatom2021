import { ResponsiveBar } from '@nivo/bar'
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => ({
    barWrapper: {
        height: 400,
        width: 700,
    },
}));

export const BarChart: React.FC<any> = ({ 
    data = [],
    keys = [
        // "Position",
        "Position1",
        "Position2",
        "Position3",
        // "DateOfBirth",
        // "Sex",
        // "MaritalStatus",
        // "StartDate",
        // "EndDate",
        // "NameOfAbsence",
        // "CalendarDaysOfAbsence",
        // "Rate",
        // "CountOfChildren",
        // "HasMentor",
    ],
    indexBy ="Month",
    legends = []
}) => {
    const classes = useStyles();

    console.log(data[0])

    return (
    <div className={classes.barWrapper}>
        <ResponsiveBar
            data={data}
            keys={keys}
            indexBy={indexBy}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Month',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Fired',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={15}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={legends}
            animate={true}
        />
    </div>
)}