import StoreModule from "../module";

class UserState extends StoreModule {
    initState() {
        return {
            name: "",
            email: "",
            phone: "",
        }
    }
    async autorization(login, password) {
        const url = '/api/v1/users/sign';
        const data = {
            login: login,
            password: password
        };
        return new Promise(async (resolve) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const json = await response.json();

            if (json.error) {
                resolve(json.error.message)
            }
            else {
                localStorage.setItem("token", json.result.token)

                await this.setState({
                    name: json.result.user.username,
                    email: json.result.user.email,
                    phone: json.result.user.profile.phone,
                }, "Пользователь успешно вошел")
                resolve("")
            }
        });
    }
    exit() {
        const url = "/api/v1/users/sign";
        const headers = new Headers({
            'X-Token': localStorage.getItem("token"),
            'Content-Type': 'application/json',
        });

        const fetchData = async () => {
            await fetch(url, {
                method: 'DELETE',
                headers: headers
            });
        }
        fetchData();

        localStorage.removeItem("token")
        this.setState({
            ...this.initState()
        }, "Пользователь вышел")
    }
    load() {
        if (localStorage.getItem("token")) {
            const url = "/api/v1/users/self?fields=*";
            const headers = new Headers({
                'X-Token': localStorage.getItem("token"),
                'Content-Type': 'application/json',
            });

            const fetchData = async () => {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: headers
                });
                const json = await response.json();

                await this.setState({
                    name: json.result.username,
                    email: json.result.email,
                    phone: json.result.profile.phone,
                }, "Пользователь успешно вошел")
            }
            fetchData();
        }
    }
}

export default UserState;