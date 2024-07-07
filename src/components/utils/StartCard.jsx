import {
  Card,
  CardBody,
  Flex,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"

function StatCard({ title, data, icon }) {
  return (
    <Card
      data-type="Card"
      flex={1}
      overflow="hidden"
      // variant='outline'
      // backgroundColor={""}
      boxShadow={"0px 3px 15px rgba(0,0,0,0.2)"}
      rounded={"lg"}
      minW={"200px"}
      w={"fit-content"}
      borderLeft={"5px solid "}
      // borderBottom={'5px solid '}
      borderColor={"purple.600"}
    >
      <CardBody>
        <Flex alignItems={"center"}>
          <Stat mr={4}>
            <StatLabel color={"gray.500"}>{title}</StatLabel>
            <Flex
              w={"full"}
              justifyContent={"space-between"}
              alignItems={"baseline"}
            >
              <StatNumber fontSize={"1.8rem"}>{data}</StatNumber>
            </Flex>
          </Stat>
          <IconButton
            py={4}
            icon={icon}
            fontSize={"1.5rem"}
            _disabled={{}}
            isDisabled
          />
        </Flex>
      </CardBody>
    </Card>
  )
}

export default StatCard
