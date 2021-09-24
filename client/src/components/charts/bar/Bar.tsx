import { ResponsiveBar } from '@nivo/bar'
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const testdata = [
{
  "country": "AD",
  "hot dog": 167,
  "hot dogColor": "hsl(358, 70%, 50%)",
  "burger": 180,
  "burgerColor": "hsl(266, 70%, 50%)",
  "sandwich": 169,
  "sandwichColor": "hsl(189, 70%, 50%)",
  "kebab": 2,
  "kebabColor": "hsl(112, 70%, 50%)",
  "fries": 70,
  "friesColor": "hsl(308, 70%, 50%)",
  "donut": 34,
  "donutColor": "hsl(251, 70%, 50%)"
},
{
  "country": "AE",
  "hot dog": 92,
  "hot dogColor": "hsl(215, 70%, 50%)",
  "burger": 32,
  "burgerColor": "hsl(178, 70%, 50%)",
  "sandwich": 10,
  "sandwichColor": "hsl(289, 70%, 50%)",
  "kebab": 152,
  "kebabColor": "hsl(352, 70%, 50%)",
  "fries": 11,
  "friesColor": "hsl(348, 70%, 50%)",
  "donut": 181,
  "donutColor": "hsl(72, 70%, 50%)"
},
{
  "country": "AF",
  "hot dog": 17,
  "hot dogColor": "hsl(318, 70%, 50%)",
  "burger": 164,
  "burgerColor": "hsl(152, 70%, 50%)",
  "sandwich": 105,
  "sandwichColor": "hsl(242, 70%, 50%)",
  "kebab": 86,
  "kebabColor": "hsl(299, 70%, 50%)",
  "fries": 137,
  "friesColor": "hsl(137, 70%, 50%)",
  "donut": 145,
  "donutColor": "hsl(189, 70%, 50%)"
},
{
  "country": "AG",
  "hot dog": 134,
  "hot dogColor": "hsl(195, 70%, 50%)",
  "burger": 42,
  "burgerColor": "hsl(72, 70%, 50%)",
  "sandwich": 158,
  "sandwichColor": "hsl(176, 70%, 50%)",
  "kebab": 82,
  "kebabColor": "hsl(5, 70%, 50%)",
  "fries": 77,
  "friesColor": "hsl(303, 70%, 50%)",
  "donut": 168,
  "donutColor": "hsl(121, 70%, 50%)"
},
{
  "country": "AI",
  "hot dog": 106,
  "hot dogColor": "hsl(67, 70%, 50%)",
  "burger": 149,
  "burgerColor": "hsl(232, 70%, 50%)",
  "sandwich": 50,
  "sandwichColor": "hsl(314, 70%, 50%)",
  "kebab": 155,
  "kebabColor": "hsl(182, 70%, 50%)",
  "fries": 149,
  "friesColor": "hsl(314, 70%, 50%)",
  "donut": 162,
  "donutColor": "hsl(134, 70%, 50%)"
},
{
  "country": "AL",
  "hot dog": 8,
  "hot dogColor": "hsl(76, 70%, 50%)",
  "burger": 11,
  "burgerColor": "hsl(318, 70%, 50%)",
  "sandwich": 190,
  "sandwichColor": "hsl(47, 70%, 50%)",
  "kebab": 158,
  "kebabColor": "hsl(154, 70%, 50%)",
  "fries": 49,
  "friesColor": "hsl(100, 70%, 50%)",
  "donut": 138,
  "donutColor": "hsl(197, 70%, 50%)"
},
{
  "country": "AM",
  "hot dog": 81,
  "hot dogColor": "hsl(315, 70%, 50%)",
  "burger": 79,
  "burgerColor": "hsl(249, 70%, 50%)",
  "sandwich": 85,
  "sandwichColor": "hsl(351, 70%, 50%)",
  "kebab": 71,
  "kebabColor": "hsl(134, 70%, 50%)",
  "fries": 170,
  "friesColor": "hsl(17, 70%, 50%)",
  "donut": 195,
  "donutColor": "hsl(242, 70%, 50%)"
}
]

const useStyles = makeStyles((theme:Theme) => ({
    barWrapper: {
        height: 400,
        width: 700,
    },
}));

export const BarChart: React.FC<any> = ({ 
    data = testdata,
    keys = [ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ],
    indexBy ="country",
    legends = []
}) => {
    const classes = useStyles();

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
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={legends}
            animate={true}
        />
    </div>
)}