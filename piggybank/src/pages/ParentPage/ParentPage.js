import React from 'react';
import AllowanceManager from '../../components/AllowanceManager/AllowanceManager'; // Ensure correct path
import ChoreManager from '../../components/ChoreManager/ChoreManager'; // Ensure correct path

const ParentPage = () => {
    return (
        <div className="parent-page">
            <AllowanceManager />
            <ChoreManager />
        </div>
    );
};

export default ParentPage;
