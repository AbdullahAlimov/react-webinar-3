import React from 'react';
import SideLayout from '../../components/side-layout';
import EntranceBlock from '../../components/entrance-block';

function Entrance(){
    return (
        <SideLayout side={"end"} padding={"small"}>
            <EntranceBlock isAuthorized={true} userName={"test"}></EntranceBlock>
        </SideLayout>
    );
};

export default Entrance;