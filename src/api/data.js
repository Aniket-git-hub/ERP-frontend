import instance from "../config/axios.config";

export const handleRequest = async (endpoint, data, method) => {
    try {
        let response;
        const token = `Bearer ${localStorage.getItem('accessToken')}`
        const config = {
            headers: {
                Authorization: token,
            },
        };
        if (data.responseType) {
            config.responseType = data.responseType
        }
        switch (method) {
            case "GET":
                response = await instance.get(endpoint, config);
                break;
            case "POST":
                response = await instance.post(endpoint, data, config);
                break;
            case "PUT":
                response = await instance.put(endpoint, data, config);
                break;
            case "DELETE":
                response = await instance.delete(endpoint, config);
                break;
            default:
                throw new Error("Invalid method");
        }
        if (response.status === 200 || response.status === 201) {
            return response;
        }
    } catch (error) {
        throw error
    }
}

