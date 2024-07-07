import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useState } from "react"
import { addAttendance } from "../../../api/endpoints/employee/attendances"
import { useData } from "../../../hooks/useData"
import { useFormValidation } from "../../../hooks/useFormValidation"

function AddAttendance({ defaultPunchIn, defaultPunchOut }) {
  const { employeeOptions } = useData()

  const [punchTypeIn, setPunchTypeIn] = useState(
    defaultPunchIn
      ? true
      : defaultPunchOut
        ? false
        : new Date().getHours() < 12,
  )

  const initialState = { employeeId: "", checkTimestamp: "" }
  const submit = async (values) => {
    try {
      const { employeeId } = values
      const response = await addAttendance(employeeId, {
        ...values,
        punchType: punchTypeIn ? "in" : "out",
      })
      return { title: "Add Attendance", message: response.data.message }
    } catch (error) {
      throw error
    }
  }
  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormValidation(initialState, submit)

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <ButtonGroup
          variant={"outline"}
          isAttached
          w={"100%"}
          mb={3}
          isDisabled={defaultPunchIn || defaultPunchOut}
        >
          <Button
            w={"100%"}
            colorScheme={punchTypeIn ? "purple" : "gray"}
            variant={punchTypeIn ? "solid" : "outline"}
            onClick={() => setPunchTypeIn(true)}
          >
            IN
          </Button>
          <Button
            w={"100%"}
            colorScheme={!punchTypeIn ? "purple" : "gray"}
            variant={!punchTypeIn ? "solid" : "outline"}
            onClick={() => setPunchTypeIn(false)}
          >
            OUT
          </Button>
        </ButtonGroup>

        <FormControl isRequired my={2}>
          <FormLabel>Select Employee</FormLabel>
          <Select
            options={employeeOptions || []}
            onChange={handleChange("employeeId")}
            value={
              employeeOptions.filter((e) => e.value === values.employeeId)[0] ||
              ""
            }
          />
        </FormControl>

        <FormControl isRequired my={2}>
          <FormLabel>Date</FormLabel>
          <Input
            type="datetime-local"
            name="checkTimestamp"
            value={values.checkTimestamp}
            onChange={handleChange()}
          />
        </FormControl>

        <FormControl my={4} mt={8}>
          <Button type="submit" w={"100%"} colorScheme="purple">
            Add Attendance
          </Button>
        </FormControl>
      </form>
    </Box>
  )
}

export default AddAttendance
