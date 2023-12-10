import { LOCALES } from "../../i18n/locales";
import StoreModule from "../module";

class Language extends StoreModule {
    initState(){
        return{
            locale:LOCALES.RUSSIAN,
        }
    }
    changeLocale(newLocale){
        this.setState({
            locale:newLocale
        },`Локализация сменена на ${newLocale}`)
    }
}
export default Language;