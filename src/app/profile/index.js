import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import ProfileInfo from "../../components/profile-info";
import Head from "../../components/head"
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Autorization from "../../containers/autorization";
import { memo, useMemo } from 'react'
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";



function Profile() {
    const { t } = useTranslate();

    const navigate = useNavigate();

    const select = useSelector(state => ({
        userTel: state.user.userInfo.phone,
        userName: state.user.userInfo.name,
        userEmail: state.user.userInfo.email,
        isAuthorized: state.user.isAutorized,
    }))

    useMemo(() => {
        if (!select.isAuthorized) {
            navigate("/login")
        }
    }, [select.isAuthorized])

    const labels = {
        name: t("profile.name"),
        profile: t("profile.profile"),
        phone: t("profile.phone"),
        email: t("profile.email"),
    }

    return (
        <div>
            <PageLayout>
                <Autorization />
                <Head title={t('title')}>
                    <LocaleSelect />
                </Head>
                <Navigation />
                <ProfileInfo userName={select.userName}
                    userTel={select.userTel}
                    userEmail={select.userEmail}
                    labels={labels} />
            </PageLayout>
        </div>
    );
};

export default memo(Profile);