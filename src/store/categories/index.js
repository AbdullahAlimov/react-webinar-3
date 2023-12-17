import { processCategories } from "../../utils";
import StoreModule from "../module";

class CategoriesState extends StoreModule {

    initState() {
        return {
            list: [{ value: "", title: "Все", depth: 0 }]
        };
    }
    load(){
        const fetchData=async()=>{
            const response= await fetch("/api/v1/categories?fields=_id,title,parent(_id)&limit=*");
            const json=await response.json();

            this.setState({
                list:[
                    ...this.getState().list,
                    ...processCategories(json.result.items)
                ]
            })
        }
        fetchData()
    }

}

export default CategoriesState;
