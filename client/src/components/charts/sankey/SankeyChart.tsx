import { ResponsiveSankey } from '@nivo/sankey'
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { ModalDialog } from '../../Modal/Modal';
import React from 'react';
import AlertDialog from '../../AlertDialog/AlertDialog';

const useStyles = makeStyles((theme:Theme) => ({
    wrapper: {
        height: 800,
        width: 1600,
    },
}));

const testdata = {
    "nodes": [
      {
        "id": "total",
        "color": "hsl(357, 70%, 50%)",
        label: "Все сотрудники"
      },
      {
        "id": "fired",
        "color": "hsl(91, 70%, 50%)",
        label: "Ушедшие из компании"
      }
    ],
    "links": [
      {
        "source": "total",
        "target": "fired",
        "value": 28
      },
    ]
  }

export const SankeyChart: React.FC<any> = ({ fired=[], total={}}) => {
    const classes = useStyles();
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [nodeId, setNodeId] = React.useState("fired")
    const [filters, setFilters] = React.useState<any>({})

    const filteredGroups = [{
        id: "fired",
        data: fired
    }]

    const [data, setData]= React.useState<any>({
        nodes: [
            {
              "id": "total",
              label: "Все сотрудники"
            },
            {
              "id": "fired",
              label: "Ушедшие из компании"
            }
          ],
        links: [
            {
                "source": "total",
                "target": "fired",
                "value": fired.length ?? 1
            },
        ]
    });

    const onSankeyClick = (data:any, event: any) => {
        if (data.id) onNodeClick(data)
        else onLinkClick(data)
        console.log(data, event)
    }

    const commonClick = (data:any ) => {
        setNodeId(data.id)
        setModalOpen(true);
        console.log(nodeId, filters)
    }

    const onNodeClick = (data: any) => {
        commonClick(data);
    }

    const onLinkClick = (data: any) => {
        // commonClick(data);
    }

    const onModalClose = () => {
        setModalOpen(false)
    }

    const handleSubmit = (data: any) => {
        console.log(data)
        setFilters({
            ...filters,
            [nodeId]: data
        })
        setModalOpen(false);
        createNewNode(data)
    }

    const handleFormChange = (e: any) => {
        setFilters({
            ...filters,
            [nodeId]: {
                ...filters[nodeId],
                [e.target.name]: e.target.value
            }
        })
    }

    function createNewNode(filters:any) {
        const filtered = filteredGroups.find((group) => group.id === nodeId)?.data.filter((data: any) => {
            return !Object.keys(filters).find((key) => {
                if (filters[key] === "") return false;
                return data[key].toString() !== filters[key]
            })
        })
        console.log("data", data)

        if (!filtered) {
            setAlertOpen(true);
            return;
        }

        const id = Object.keys(filters).map((key) => `${key} - ${filters[key]}`).join(" ");
        filteredGroups.push({id: id, data: filtered, });
        const node = {
            id: id,
            label: id
        }
        const link = {
            source: nodeId,
            target: id,
            value: filtered.length,
        }
        setData({
            nodes: [...data.nodes, node],
            links: [...data.links, link],
        });
        console.log(node, link, data)
        console.log("fired",fired)
    }

    return (
        <div className={classes.wrapper}>
    <ResponsiveSankey
        data={data}
        label={node => `${node.label}`}
        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
        align="justify"
        colors={{ scheme: 'category10' }}
        nodeOpacity={1}
        nodeThickness={128}
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
        ]}
        onClick={onSankeyClick}
    />
    <ModalDialog 
        filter={filters[nodeId]}
        open={isModalOpen}
        handleClose={onModalClose}
        title={"Выберите дополнительные критерии"}
        handleSubmit={handleSubmit}
        handleChange={handleFormChange}
    />
    <AlertDialog open={alertOpen} handleClose={() => setAlertOpen(false)} title={"По заданным параметрам сотруднеков не найдено"}>
        Попробуйти изменить критерии фильтрации
    </AlertDialog>
    </div>
)}