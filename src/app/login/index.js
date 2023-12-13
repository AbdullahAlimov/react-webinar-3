import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import LoginForm from "../../components/login-form";
import Head from "../../components/head"
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import {memo} from 'react'

function Login(){
    const {t} = useTranslate();
    return(
        <PageLayout>
            <Head title={t('title')}>
                <LocaleSelect/>
            </Head>
            <Navigation/>
            <LoginForm/>
        </PageLayout>
    )
}

export default memo(Login)