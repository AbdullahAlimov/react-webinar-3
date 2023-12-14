import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import ProfileInfo from "../../components/profile-info";
import Head from "../../components/head"
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Autorization from "../../containers/autorization";
import { memo, useEffect } from 'react'
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";



function Profile() {
    const { t } = useTranslate();

    const navigate=useNavigate();

    const select= useSelector(state=>({
        userTel: state.user.userInfo.phone,
        userName: state.user.userInfo.name,
        userEmail: state.user.userInfo.email,
        isAuthorized:state.user.isAutorized,
    }))

    useEffect(()=>{
        if(!select.isAuthorized){
            navigate("/login")
        }
    },[select.isAuthorized])

    return (
        <div>
            <PageLayout>
                <Autorization/>
                <Head title={t('title')}>
                    <LocaleSelect />
                </Head>
                <Navigation />
                <ProfileInfo userName={select.userName} userTel={select.userTel} userEmail={select.userEmail} />
            </PageLayout>
        </div>
    );
};

export default memo(Profile);