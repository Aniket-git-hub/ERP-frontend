import instance from "../config/axios.config"

const handleRequest = async (url, data) => {
    try {
        const response = await instance.post(url, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            // withCredentials: true
        })
        if ([200, 201].includes(response.status)) {
            return response
        }
    } catch (error) {
        throw error
    }
}


export const loginUser = async (credentials) => handleRequest('/auth/login', credentials)
