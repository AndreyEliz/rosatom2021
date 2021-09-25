import { ResponsiveSankey } from '@nivo/sankey'
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import classes from '*.module.css';

const useStyles = makeStyles((theme:Theme) => ({
    wrapper: {
        height: 800,
        width: 1600,
    },
}));

const testdata = {
    "nodes": [
      {
        "id": "John",
        "color": "hsl(357, 70%, 50%)",
        value: 0.003
      },
      {
        "id": "Raoul",
        "color": "hsl(91, 70%, 50%)"
      },
      {
        "id": "Jane",
        "color": "hsl(58, 70%, 50%)"
      },
      {
        "id": "Marcel",
        "color": "hsl(44, 70%, 50%)"
      },
      {
        "id": "Ibrahim",
        "color": "hsl(215, 70%, 50%)"
      },
      {
        "id": "Junko",
        "color": "hsl(29, 70%, 50%)"
      }
    ],
    "links": [
      {
        "source": "Jane",
        "target": "Raoul",
        "value": 28
      },
      {
        "source": "Jane",
        "target": "Junko",
        "value": 142
      },
      {
        "source": "Marcel",
        "target": "Ibrahim",
        "value": 162
      },
      {
        "source": "Marcel",
        "target": "Junko",
        "value": 136
      },
      {
        "source": "Marcel",
        "target": "Raoul",
        "value": 159
      },
      {
        "source": "Marcel",
        "target": "Jane",
        "value": 24
      },
      {
        "source": "Junko",
        "target": "Raoul",
        "value": 97
      },
      {
        "source": "Junko",
        "target": "John",
        "value": 195
      },
      {
        "source": "Ibrahim",
        "target": "Jane",
        "value": 142
      },
      {
        "source": "Raoul",
        "target": "John",
        "value": 69
      }
    ]
  }

export const SankeyChart = ({ data = testdata}) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
    <ResponsiveSankey
        data={data}
        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
        align="justify"
        colors={{ scheme: 'category10' }}
        nodeOpacity={1}
        nodeThickness={18}
        nodeInnerPadding={3}
        nodeSpacing={24}
        nodeBorderWidth={0}
        nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="vertical"
        labelPadding={16}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
        legends={[
            // {
            //     anchor: 'bottom-right',
            //     direction: 'column',
            //     translateX: 130,
            //     itemWidth: 100,
            //     itemHeight: 14,
            //     itemDirection: 'right-to-left',
            //     itemsSpacing: 2,
            //     itemTextColor: '#999',
            //     symbolSize: 14,
            //     effects: [
            //         {
            //             on: 'hover',
            //             style: {
            //                 itemTextColor: '#000'
            //             }
            //         }
            //     ]
            // }
        ]}
    />
    </div>
)}