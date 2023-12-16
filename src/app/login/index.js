import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import LoginForm from "../../components/login-form";
import Head from "../../components/head"
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Autorization from "../../containers/autorization";
import { memo, useCallback, useEffect, useState } from 'react'
import useStore from "../../hooks/use-store";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function Login() {
    const store = useStore();

    const { t } = useTranslate();

    const navigate= useNavigate();

    const isAutorized=useSelector(state=>state.autorization.isAutorized);

    useEffect(()=>{
        if(isAutorized){
            navigate(-1)
        }
    },[isAutorized])

    const [errorMessage,setErrorMessage]=useState("");
    const [loginValue,setLoginValue]=useState("");
    const [passwordValue,setPasswordValue]=useState("");

    const callbacks={
        submitState:useCallback(async()=>{
            await store.actions.user.autorization(loginValue, passwordValue)
            .then((message) => {
                setErrorMessage(message);
            })
            await store.actions.autorization.load();
        },[loginValue,passwordValue]),

        changeInput:useCallback((data)=>{
            setLoginValue(data.login)
            setPasswordValue(data.password)
        },[loginValue,passwordValue]),
    }
    
    const labels={
        enter: t("enter"),
        login: t("login.login"),
        password: t("login.password"),
        buttonEnter: t("login.enter"),
    }
    return (
        <PageLayout>
            <Autorization/>
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <LoginForm 
            errorMessage={errorMessage} 
            login={loginValue}
            password={passwordValue}
            onSubmit={callbacks.submitState}
            onChange={callbacks.changeInput}
            onRedirect={callbacks.navigateToPreviousPath}
            labels={labels}/>
        </PageLayout>
    )
}

export default memo(Login)