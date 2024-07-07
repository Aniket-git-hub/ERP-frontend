import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react"
import { Select as ChakraReactSelect } from "chakra-react-select"
import { useState } from "react"

const FormInput = ({
  type = "text",
  name,
  value,
  onChange,
  label,
  error,
  isRequired = false,
  leftAddon,
  rightAddon,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  options = [],
  isMulti = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return <Textarea name={name} value={value} onChange={onChange} />
      case "select":
        return (
          <ChakraReactSelect
            name={name}
            value={options.find((option) => option.value === value)}
            onChange={(option) =>
              onChange({
                target: {
                  name,
                  value: isMulti
                    ? option.map((opt) => opt.value)
                    : option.value,
                },
              })
            }
            options={options}
            isMulti={isMulti}
          />
        )
      case "password":
        return (
          <InputGroup>
            {leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
            {leftIcon && <InputLeftAddon>{leftIcon}</InputLeftAddon>}
            <Input
              type={showPassword ? "text" : "password"}
              name={name}
              value={value}
              onChange={onChange}
            />
            {showPasswordToggle && (
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  variant="ghost"
                  size="sm"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            )}
            {rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
            {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
          </InputGroup>
        )
      default:
        return (
          <InputGroup>
            {leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
            {leftIcon && <InputLeftAddon>{leftIcon}</InputLeftAddon>}
            <Input type={type} name={name} value={value} onChange={onChange} />
            {rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
            {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
          </InputGroup>
        )
    }
  }

  return (
    <FormControl isInvalid={error} isRequired={isRequired} mb=".8rem">
      {label && <FormLabel>{label}</FormLabel>}
      {renderInput()}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export default FormInput
