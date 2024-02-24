import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, InputGroup, InputRightAddon, Switch, Textarea, VStack } from "@chakra-ui/react";
import {
    Select
} from "chakra-react-select";
import { useEffect, useRef, useState } from "react";
import { addJob } from "../../../api/data";
import { useData } from "../../../hooks/useData";
import { useFormValidation } from "../../../hooks/useFormValidation";

function AddJobs() {
    const drawingNumberInputRef = useRef()
    const { clients, materials } = useData()
    const initialState = { drawingNumber: '', quantity: '', rate: '', clientId: -1, materialId: -1, date: '', size: '', description: '' }
    const [defaultValues, setDefaultValues] = useState({ clientId: '', materialId: '', date: '', description: '' })


    const saveJobs = async (values) => {
        if (!useDefaultDescription) {
            setDefaultDescription([])
        }
        try {
            const { data: { message } } = await addJob(values)
            return { message, title: "Save Jobs" }
        } catch (error) {
            console.log(error)
        } finally {
            drawingNumberInputRef.current.focus()
        }
    }

    const { values, setValues, errors, handleChange, handleSubmit, isSubmitting } = useFormValidation(initialState, saveJobs, defaultValues, {
        drawingNumber: {
            replaceSpace: '_'
        },
        size: {
            replaceSpace: 'x'
        }
    })

    const descriptions = [
        'Mylar',
        'Fabrication',
        'Block Size',
        'One Side',
        'Two Side',
        'Flat',
        'Top-Bottom',
        'Plate',
        'CPS',
        'Dolly Plate',
        'T',
        'Bracket',
        'Slotting',
        'Side Milling',
        'key',
        'L',
        'Patexer',
        'Guide Block',
        'Arm',
        'Clean Cut',
        'Lever',
        'Rework',
        'clamp',
        'square tube'
    ]


    const [defaultDate, setDefaultDate] = useState('')
    const [defaultClient, setDefaultClient] = useState('')
    const [defaultMaterial, setDefaultMaterial] = useState('')
    const [defaultDescription, setDefaultDescription] = useState([])
    const [useDefaultDescription, setUseDefaultDescription] = useState(false)
    const handleUseDefaultDescriptionChange = () => {
        setUseDefaultDescription(prev => !prev)
    }

    const handleSelectDescription = (des) => {
        if (defaultDescription.includes(des)) {
            setDefaultDescription(prev => prev.length > 0 && prev.filter((d) => d != des));
        } else {
            setDefaultDescription(prev => [...prev, des])
        }
    }

    useEffect(() => {
        setValues(prev => ({ ...prev, date: defaultDate, clientId: defaultClient, materialId: defaultMaterial, description: defaultDescription.join(",") }))
        setDefaultValues(prev => ({ ...prev, clientId: defaultClient, date: defaultDate, materialId: defaultMaterial }))
    }, [defaultDate, defaultClient, defaultMaterial])
    useEffect(() => {
        setValues(prev => ({ ...prev, description: defaultDescription.join(",") }))
        setDefaultValues(prev => ({ ...prev, description: defaultDescription.join(",") }))
    }, [defaultDescription])

    return (
        <Flex gap={10}>
            <Box mx={10} flex={1} boxShadow={'0px 3px 15px rgba(0,0,0,0.2)'} p={5} px={10} rounded={'lg'}>
                <Heading size={"md"} mb={5} color={'gray.700'}>
                    Add Drawing
                </Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl isInvalid={errors.drawingNumber} isRequired mb=".8rem">
                        <FormLabel>Drawing Number</FormLabel>
                        <Input type='text' name="drawingNumber" value={values.drawingNumber.toUpperCase()} onChange={handleChange()} autoFocus={true} ref={drawingNumberInputRef} />
                        <FormErrorMessage>{errors.drawingNumber}</FormErrorMessage>
                    </FormControl>
                    <HStack>
                        <FormControl isInvalid={errors.quantity} isRequired mb=".8rem">
                            <FormLabel>Quantity</FormLabel>
                            <InputGroup>
                                <Input type='number' name="quantity" value={values.quantity} onChange={handleChange()} textAlign={"right"} />
                                <InputRightAddon children="Nos" />
                            </InputGroup>
                            <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.rate} mb=".8rem">
                            <FormLabel>Rate</FormLabel>
                            <InputGroup>
                                <Input type='number' name="rate" value={values.rate} onChange={handleChange()} textAlign={"right"} />
                                <InputRightAddon children="Rs" />
                            </InputGroup>
                            <FormErrorMessage>{errors.rate}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.date} isRequired mb=".8rem">
                            <FormLabel>Date</FormLabel>
                            <Input type='date' name="date" value={values.date} onChange={handleChange()} />
                            <FormErrorMessage>{errors.date}</FormErrorMessage>
                        </FormControl>
                    </HStack>

                    <HStack>
                        <FormControl isInvalid={errors.clientId} isRequired mb=".8rem">
                            <FormLabel>Select Client</FormLabel>
                            <Select
                                onChange={handleChange('clientId')}
                                colorScheme="purple"
                                tagVariant={"solid"}
                                options={clients.map(client => ({ 'label': client.name, 'value': client.id }))}
                                value={clients.map(client => {
                                    if (client.id === values.clientId) {
                                        return { 'label': client.name, 'value': client.id }
                                    }
                                })}
                            />
                            <FormErrorMessage>
                                {errors.clientId}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl mb=".8rem">
                            <FormLabel>Select Materials</FormLabel>
                            <Select
                                onChange={handleChange('materialId')}
                                colorScheme="purple"
                                tagVariant={"solid"}
                                options={materials.map(material => ({ 'label': material.name, 'value': material.id }))}
                                value={materials.map(material => {
                                    if (material.id === values.materialId) {
                                        return { 'label': material.name, 'value': material.id }
                                    }
                                })}
                            />
                            <FormErrorMessage>
                                This error message shows because of an invalid FormControl
                            </FormErrorMessage>
                        </FormControl>
                    </HStack>

                    <FormControl isInvalid={errors.size} mb=".8rem">
                        <FormLabel>Size</FormLabel>
                        <Input type='text' name="size" value={values.size.toUpperCase()} onChange={handleChange()} />
                        <FormErrorMessage>{errors.size}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.description} mb=".8rem">
                        <FormLabel>Description</FormLabel>
                        <Textarea name="description" value={values.description} onChange={handleChange()} />
                        <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </FormControl>

                    <Center w={"full"}>
                        <VStack w={"full"}>
                            <Button w={"full"} type="submit" mt={5} colorScheme='purple' isLoading={isSubmitting} loadingText="Saving..." disabled={isSubmitting}>
                                Save Job
                            </Button>
                        </VStack>
                    </Center>
                </form>
            </Box>

            <Box h={""} pr={5} flex={1}>
                <Heading size={"md"} mb={5}>
                    Set Defaults
                </Heading>
                <HStack>


                    <FormControl mb=".8rem">
                        <FormLabel>Date</FormLabel>
                        <Input type='date' name="date" value={defaultDate} onChange={(e) => setDefaultDate(e.target.value)} />
                    </FormControl>

                    <FormControl mb=".8rem">
                        <FormLabel>Select Client</FormLabel>
                        <Select
                            onChange={(o) => setDefaultClient(o.value)}
                            colorScheme="purple"
                            tagVariant={"solid"}
                            options={clients.map(client => ({ 'label': client.name, 'value': client.id }))}
                            value={clients.map(client => {
                                if (client.id === defaultClient) {
                                    return { 'label': client.name, 'value': client.id }
                                }
                            })}
                        />
                    </FormControl>

                    <FormControl mb=".8rem">
                        <FormLabel>Select Materials</FormLabel>
                        <Select
                            onChange={(o) => setDefaultMaterial(o.value)}
                            colorScheme="purple"
                            tagVariant={"solid"}
                            options={materials.map(material => ({ 'label': material.name, 'value': material.id }))}
                            value={materials.map(material => {
                                if (material.id === defaultMaterial) {
                                    return { 'label': material.name, 'value': material.id }
                                }
                            })}
                        />
                    </FormControl>
                </HStack>

                <FormControl >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <FormLabel> Enable default description
                        </FormLabel>
                        <Switch isChecked={useDefaultDescription} onChange={handleUseDefaultDescriptionChange} />
                    </Flex>
                </FormControl>
                <FormControl >

                    <FormLabel>Select Description </FormLabel>

                    <Flex width={'full'} flexWrap={'wrap'} gap={3}>
                        {descriptions.map((description) => (
                            <Button
                                key={description}
                                onClick={() => handleSelectDescription(description)}
                                variant={'outline'}
                                colorScheme={defaultDescription.includes(description) && 'purple'}
                                width={'fit-content'}
                                textTransform={"uppercase"}
                            >
                                {description}
                            </Button>
                        ))}
                    </Flex>

                </FormControl>
            </Box>
        </Flex>
    )
}

export default AddJobs