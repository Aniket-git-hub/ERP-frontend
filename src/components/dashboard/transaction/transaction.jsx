import { Box, Flex, Heading, Table, TableContainer, Th, Thead } from "@chakra-ui/react"
import CustomForm from "../../utils/CustomForm"

function Transaction() {
    const fields = [
        {
            horizontal: true,
            inputs: [

                { name: "firstName", label: "First Name", type: "text", required: true },
                { name: "lastName", label: "Last Name", type: "text", required: true },
            ]
        },
        {
            inputs: [

                { name: "email", label: "Email", type: "email", required: true, },
                { name: "password", label: "Password", type: "password", required: true },
            ]
        },
        {
            horizontal: true,
            inputs: [

                { name: "age", label: "Age", type: "number", required: true, rightAddOn: "years" },
                { name: "bloodGroup", label: "Blood Group", type: "select", options: [{ value: 1, label: "O" }, { value: 2, label: "B" }], required: true },
            ]
        },
        {
            inputs: [

                { name: "address", label: "Address", type: "textarea", required: true, },
            ]
        },

    ]
    const initialState = { firstName: '', lastName: "", email: "", password: "", age: "", bloodGroup: "", address: "" }
    return (
        <Box>
            <Flex>
                <Heading size={'md'} color={'gray.700'}>Transaction this month</Heading>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Th>
                                Sr. No
                            </Th>
                            <Th>Amount</Th>

                        </Thead>
                    </Table>
                </TableContainer>
                <CustomForm
                    submitButtonText={"Submit"}
                    loadingText={"submitting..."}
                    fields={fields}
                    initialState={initialState}
                />
            </Flex>
        </Box>
    )
}

export default Transaction