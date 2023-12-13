import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import LoginForm from "../../components/login-form";
import Head from "../../components/head"
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Entrance from "../../containers/entrance";
import { memo } from 'react'

function Login() {
    const { t } = useTranslate();
    const [user,setUser]=useState();

    useEffect(() => {
        const url = '/api/v1/users/sign';
        const data = {
            login: 'test_1',
            password: '12356'
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);
            })
    }, [])
    return (
        <PageLayout>
            <Entrance></Entrance>
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <LoginForm />
        </PageLayout>
    )
}

export default memo(Login)