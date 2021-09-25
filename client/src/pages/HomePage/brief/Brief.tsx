import React, { useEffect } from 'react';
import CardCustom from '../../../components/CardCustom/CardCustom';
import type { Person } from '../../../store/models/types';
type BriefProps = {
    data: number
}


export const Brief: React.FC<BriefProps> = ({data}) => {

    return (
    <div>
        <CardCustom noHeader={true} collapsable={false}>
            Текущая текучесть кадров: {data}
        </CardCustom>
    </div>   
    );
}
