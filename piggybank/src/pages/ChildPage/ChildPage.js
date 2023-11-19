import React from 'react';
import ItemBox from '../../components/ItemBox/ItemBox';  // Ensure correct path
import Balance from '../../components/Balance/Balance';  // Ensure correct path
import ChoreList from '../../components/ChoreList/ChoreList';  // Ensure correct path

const ChildPage = () => {
    return (
        <div className="child-page">
            <ItemBox />
            <Balance />
            <ChoreList />
        </div>
    );
};

export default ChildPage;
