import React, { useCallback } from 'react';
import SideLayout from '../../components/side-layout';
import AutorizationBlock from '../../components/autorization-block';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';

function Autorization() {
    const store = useStore();

    const { t } = useTranslate();

    useInit(() => {
        store.actions.catalog.initParams();
        store.actions.user.load();
    }, [], true);

    const select = useSelector(state => ({
        isAuthorized: state.user.isAutorized,
        userName: state.user.userInfo.name
    }))

    const callbacks = {
        exitOfAccount: useCallback(() => {
            store.actions.user.exit()
        }, [])
    }

    const labels = {
        enter: t("enter"),
        exit: t("exit"),
    }

    return (
        <SideLayout side={"end"} padding={"small"}>
            <AutorizationBlock 
            isAuthorized={select.isAuthorized} 
            userName={select.userName} 
            onExit={callbacks.exitOfAccount}
            labels={labels}></AutorizationBlock>
        </SideLayout>
    );
};

export default Autorization;