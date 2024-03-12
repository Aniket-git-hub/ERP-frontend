import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"

function CustomAlertDialog({ button, buttonText, alertTitle, alertText, confirmButtonStatus, confirmButtonText, confirmMethod, ...buttonProps }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    return (
        <>
            {
                button && button(onOpen)
            }

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {alertTitle}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {alertText}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button isDisabled={confirmButtonStatus} isLoading={confirmButtonStatus} colorScheme='red' onClick={() => confirmMethod(onClose)} ml={3}>
                                {confirmButtonText}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default CustomAlertDialog