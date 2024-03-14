import { useToast } from "@chakra-ui/react"
import { useState } from "react"

function ActionButton(button, action, actionId, actionData, toastTitle) {
    const toast = useToast()

    const [buffering, setBuffering] = useState(false)
    const submit = async () => {
        setBuffering(true)
        try {
            let response
            if (actionId && actionData === undefined) {
                response = await action(actionId)
            } else if (actionId && actionData) {
                response = await action(actionId, actionData)
            }
            toast({
                title: toastTitle,
                description: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            })
        } catch (error) {
            toast({
                title: toastTitle,
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'left-accent'
            })
        } finally {
            setBuffering(false)
        }
    }

    return (
        <>
            {
                button &&
                button(submit)
            }
        </>
    )
}

export default ActionButton