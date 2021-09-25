import { ResponsivePie } from '@nivo/pie';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => ({
    barWrapper: {
        height: 400,
        width: 500,
        textAlign: "center",
    },
}));

export const Pie: React.FC<any>  = ({ data=[] }) => {
    const classes = useStyles();

    return (
        <div className={classes.barWrapper}>
            <InputLabel>Уволенные за последние 12 месяцев</InputLabel>
        <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Old'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Young'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Young'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Old'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </div>)
    }