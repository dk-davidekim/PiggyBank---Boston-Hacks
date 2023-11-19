import React from 'react';
import ItemBox from '../../components/ItemBox/ItemBox';
import Balance from '../../components/Balance/Balance';
import ChoreList from '../../components/ChoreList/ChoreList';
import Graph from '../../components/Graph/Graph';
import './ChildPage.css';

const ChildPage = () => {
    return (
        <div className="child-page">
            <ItemBox />
            <Balance />
            <Graph />
            <ChoreList />
        </div>
    );
};

export default ChildPage;
