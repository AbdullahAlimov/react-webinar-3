import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import LoginForm from "../../components/login-form";
import Head from "../../components/head"
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Autorization from "../../containers/autorization";
import { memo, useCallback, useState } from 'react'
import useStore from "../../hooks/use-store";

function Login() {
    const store = useStore();

    const { t } = useTranslate();

    const [errorMessage,setErrorMessage]=useState("");
    const [loginValue,setLoginValue]=useState("");
    const [passwordValue,setPasswordValue]=useState("");

    const callbacks={
        submitState:useCallback(()=>{
            store.actions.user.autorization(loginValue, passwordValue)
            .then((message) => {
                setErrorMessage(message);
            })
        },[loginValue,passwordValue]),
        changeInput:useCallback((data)=>{
            setLoginValue(data.login)
            setPasswordValue(data.password)
        },[loginValue,passwordValue])
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
            onChange={callbacks.changeInput}/>
        </PageLayout>
    )
}

export default memo(Login)