import { useToast } from "@chakra-ui/react"
import { useState } from "react"

const useApiWithToast = (apiFunction, title, successMessage, errorMessage) => {
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()

  const callApi = async (...args) => {
    setLoading(true)
    try {
      const response = await apiFunction(...args)
      toast({
        title: title,
        description: successMessage || response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
      return response
    } catch (error) {
      toast({
        title: title,
        description:
          errorMessage ||
          error.response?.data?.message ||
          "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return [callApi, isLoading]
}

export default useApiWithToast
