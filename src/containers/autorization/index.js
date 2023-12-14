import React, { useCallback} from 'react';
import SideLayout from '../../components/side-layout';
import AutorizationBlock from '../../components/autorization-block';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function Autorization(){
    const store=useStore();
    const select=useSelector(state=>({
        isAuthorized:state.user.isAutorized,
        userName:state.user.userInfo.name
    }))

    const callbacks={
        exitOfAccount:useCallback(()=>{
            store.actions.user.exit()
        },[])
    }
    return (
        <SideLayout side={"end"} padding={"small"}>
            <AutorizationBlock isAuthorized={select.isAuthorized} userName={select.userName} onExit={callbacks.exitOfAccount}></AutorizationBlock>
        </SideLayout>
    );
};

export default Autorization;