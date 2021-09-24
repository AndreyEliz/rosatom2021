import { ResponsiveLine } from '@nivo/line'
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const testdata = [
    {
      "id": "japan",
      "color": "hsl(268, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 35
        },
        {
          "x": "helicopter",
          "y": 182
        },
        {
          "x": "boat",
          "y": 73
        },
        {
          "x": "train",
          "y": 299
        },
        {
          "x": "subway",
          "y": 145
        },
        {
          "x": "bus",
          "y": 220
        },
        {
          "x": "car",
          "y": 48
        },
        {
          "x": "moto",
          "y": 81
        },
        {
          "x": "bicycle",
          "y": 231
        },
        {
          "x": "horse",
          "y": 15
        },
        {
          "x": "skateboard",
          "y": 193
        },
        {
          "x": "others",
          "y": 89
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(55, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 250
        },
        {
          "x": "helicopter",
          "y": 54
        },
        {
          "x": "boat",
          "y": 31
        },
        {
          "x": "train",
          "y": 227
        },
        {
          "x": "subway",
          "y": 197
        },
        {
          "x": "bus",
          "y": 154
        },
        {
          "x": "car",
          "y": 119
        },
        {
          "x": "moto",
          "y": 290
        },
        {
          "x": "bicycle",
          "y": 15
        },
        {
          "x": "horse",
          "y": 55
        },
        {
          "x": "skateboard",
          "y": 174
        },
        {
          "x": "others",
          "y": 34
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(269, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 146
        },
        {
          "x": "helicopter",
          "y": 25
        },
        {
          "x": "boat",
          "y": 297
        },
        {
          "x": "train",
          "y": 91
        },
        {
          "x": "subway",
          "y": 60
        },
        {
          "x": "bus",
          "y": 96
        },
        {
          "x": "car",
          "y": 135
        },
        {
          "x": "moto",
          "y": 289
        },
        {
          "x": "bicycle",
          "y": 268
        },
        {
          "x": "horse",
          "y": 267
        },
        {
          "x": "skateboard",
          "y": 72
        },
        {
          "x": "others",
          "y": 253
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(341, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 87
        },
        {
          "x": "helicopter",
          "y": 91
        },
        {
          "x": "boat",
          "y": 51
        },
        {
          "x": "train",
          "y": 102
        },
        {
          "x": "subway",
          "y": 49
        },
        {
          "x": "bus",
          "y": 269
        },
        {
          "x": "car",
          "y": 135
        },
        {
          "x": "moto",
          "y": 175
        },
        {
          "x": "bicycle",
          "y": 141
        },
        {
          "x": "horse",
          "y": 188
        },
        {
          "x": "skateboard",
          "y": 232
        },
        {
          "x": "others",
          "y": 62
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(77, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 78
        },
        {
          "x": "helicopter",
          "y": 106
        },
        {
          "x": "boat",
          "y": 244
        },
        {
          "x": "train",
          "y": 193
        },
        {
          "x": "subway",
          "y": 184
        },
        {
          "x": "bus",
          "y": 223
        },
        {
          "x": "car",
          "y": 137
        },
        {
          "x": "moto",
          "y": 187
        },
        {
          "x": "bicycle",
          "y": 200
        },
        {
          "x": "horse",
          "y": 72
        },
        {
          "x": "skateboard",
          "y": 117
        },
        {
          "x": "others",
          "y": 108
        }
      ]
    }
  ]

const useStyles = makeStyles((theme:Theme) => ({
    lineWrapper: {
        height: 400,
        width: 700,
    },
}));

export const LineChart = ({ data = testdata }) => {
    const classes = useStyles();
    return (
    <div className={classes.lineWrapper}>
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
)}