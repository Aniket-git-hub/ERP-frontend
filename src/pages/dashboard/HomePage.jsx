import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {
  FaFileInvoiceDollar,
  FaHashtag,
  FaRupeeSign,
  FaWrench,
} from "react-icons/fa"
import StatCard from "../../components/utils/StartCard"
import LineGraph from "../../components/utils/charts/LineChart"
import { useData } from "../../hooks/useData"
import { formatCurrency } from "../../utils/utils"

function HomePage() {
  const {
    currentMonthJobAggregate,
    currentMonthInvoiceAggregate,
    previousMonthJobAggregate,
    previousMonthInvoiceAggregate,
    currentYearJobAggregate,
    currentYearInvoiceAggregate,
  } = useData()

  const generateCardData = (jobAggregate, invoiceAggregate) => [
    {
      title: "Total Quantity",
      icon: <FaHashtag />,
      data: jobAggregate.totalQuantity,
    },
    { title: "Total Jobs", icon: <FaWrench />, data: jobAggregate.totalJobs },
    {
      title: "Total Invoices",
      icon: <FaFileInvoiceDollar />,
      data: invoiceAggregate.totalInvoices,
    },
    {
      title: "Total Invoice Amount",
      icon: <FaRupeeSign />,
      data: invoiceAggregate?.invoiceStats?.totalAmountAfterTax,
    },
  ]

  useEffect(() => {
    setCards(
      generateCardData(currentMonthJobAggregate, currentMonthInvoiceAggregate),
    )
  }, [currentMonthJobAggregate, currentMonthInvoiceAggregate])

  useEffect(() => {
    setPreviousMonthCards(
      generateCardData(
        previousMonthJobAggregate,
        previousMonthInvoiceAggregate,
      ),
    )
  }, [previousMonthJobAggregate, previousMonthInvoiceAggregate])

  useEffect(() => {
    setCurrentYearCard(
      generateCardData(currentYearJobAggregate, currentYearInvoiceAggregate),
    )
  }, [currentYearJobAggregate, currentYearInvoiceAggregate])

  const [cards, setCards] = useState([])
  const [previousMonthCards, setPreviousMonthCards] = useState([])
  const [currentYearCard, setCurrentYearCard] = useState([])

  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page c", uv: 350, pv: 2400, amt: 1900 },
    { name: "Page b", uv: 250, pv: 2400, amt: 1200 },
  ]

  return (
    <Box p={5}>
      <Text
        fontSize={"xs"}
        fontWeight={"bold"}
        color={"gray.600"}
        textTransform={"uppercase"}
      >
        Last Month
      </Text>
      <Flex
        w={"100%"}
        gap={8}
        py={5}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        {previousMonthCards.map((card, index) => (
          <StatCard
            title={card.title}
            icon={card.icon}
            data={
              card.title === "Total Invoice Amount"
                ? formatCurrency(Math.ceil(card.data), "en-IN", false, "INR")
                : Math.ceil(card.data)
            }
            key={`${index}-${card.title}`}
          />
        ))}
      </Flex>
      <Flex>
        <LineGraph data={data} />
      </Flex>
      <Text
        fontSize={"xs"}
        fontWeight={"bold"}
        color={"gray.600"}
        textTransform={"uppercase"}
      >
        April, 2024
      </Text>
      <Flex
        w={"100%"}
        gap={8}
        py={5}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        {cards.map((card, index) => (
          <StatCard
            title={card.title}
            icon={card.icon}
            data={
              card.title === "Total Invoice Amount"
                ? formatCurrency(Math.ceil(card.data), "en-IN", false, "INR")
                : Math.ceil(card.data)
            }
            key={`${index}-${card.title}`}
          />
        ))}
      </Flex>

      <Text
        fontSize={"xs"}
        fontWeight={"bold"}
        color={"gray.600"}
        textTransform={"uppercase"}
      >
        Overall {new Date().getFullYear().toString()}
      </Text>
      <Flex
        w={"100%"}
        gap={8}
        py={5}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        {currentYearCard.map((card, index) => (
          <StatCard
            title={card.title}
            icon={card.icon}
            data={
              card.title === "Total Invoice Amount"
                ? formatCurrency(Math.ceil(card.data), "en-IN", false, "INR")
                : Math.ceil(card.data)
            }
            key={`${index}-${card.title}`}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default HomePage
