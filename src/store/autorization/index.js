import StoreModule from "../module";

class AutorizationState extends StoreModule {
    initState() {
        return {
            isAutorized:false,
        }
    }
    load(){
        if(localStorage.getItem("token")){this.setState({isAutorized:true})}
        else{this.setState({isAutorized:false})}
    }
}

export default AutorizationState;