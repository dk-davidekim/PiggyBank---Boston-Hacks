import React from 'react';
import AllowanceManager from '../../components/AllowanceManager/AllowanceManager';
import ChoreManager from '../../components/ChoreManager/ChoreManager';
import './ParentPage.css';

const ParentPage = () => {
    return (
        <div className="parent-page">
            <AllowanceManager />
            <ChoreManager />
        </div>
    );
};

export default ParentPage;
