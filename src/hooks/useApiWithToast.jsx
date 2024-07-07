import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

const useApiWithToast = (apiFunction, successMessage, errorMessage) => {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    const callApi = async (...args) => {
        setLoading(true);
        try {
            const response = await apiFunction(...args);
            toast({
                title: successMessage.title,
                description: successMessage.description || response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            return response;
        } catch (error) {
            toast({
                title: errorMessage.title,
                description: errorMessage.description || error.response?.data?.message || 'Something went wrong',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return [callApi, isLoading];
};

export default useApiWithToast;
