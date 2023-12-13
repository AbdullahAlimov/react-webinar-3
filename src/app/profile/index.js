import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import ProfileInfo from "../../components/profile-info";
import Head from "../../components/head"
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import {memo} from 'react'


function Profile() {
    const {t} = useTranslate();
    return (
        <div>
            <PageLayout>
                <Head title={t('title')}>
                    <LocaleSelect />
                </Head>
                <Navigation />
                <ProfileInfo userName={"test"} userTel={"test"} userEmail={"test"}/>
            </PageLayout>
        </div>
    );
};

export default memo(Profile);