import { API_URL, BASE_URL } from 'config';
import React, { useEffect } from 'react';
import { post, get } from 'sfapi';
import { BarChart } from '../../components/charts/bar/Bar';
import { LineChart } from '../../components/charts/line/Line';

const styles = {
    sandbox: {
        width: "100%",
        height:"500px",
        border:0,
        overflow:"hidden"
    }
}

const HomePage: React.FC = () => {
    const [data, setData] = React.useState([])
    
    useEffect(() => {
        post(`${BASE_URL}/api/data`).then((data:any) => {
            console.log(data)
        })
        get(`${API_URL}/RosAtom/GetByMonth/10`).then((data) => setData(data))
        get(`${API_URL}/RosAtom/GetAll`).then((data) => setData(data))
    }, []);
 
        console.log(data)
    return (
    <div>
        <BarChart data={undefined}/>
        <LineChart data={undefined} />
    </div>   
    );
}

export default HomePage;