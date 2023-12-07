import { LOCALES } from "../../i18n/locales";
import StoreModule from "../module";

class Language extends StoreModule {
    initState(){
        return{
            locale:LOCALES.RUSSIAN,
        }
    }
}
export default Language;