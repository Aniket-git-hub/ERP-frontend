import { Box } from "@chakra-ui/react";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../../../api/data";
import { useData } from "../../../hooks/useData";
import DataTable from "../../utils/DataTable";

function ViewInvoices() {
    const { invoices: { items, ...paginationData }, setInvoices } = useData()

    const flattenedInvoice = (item) => {
        if (!item || (item && item.length < 1)) return []
        return item.map(invoice => {
            const flattenedInvoice = { ...invoice };
            if (invoice.client && typeof invoice.client === 'object') {
                flattenedInvoice.client = invoice.client.name;
            }
            return flattenedInvoice;
        })
    }

    const loadData = async (page, limit = 10) => {
        try {
            const response = await getInvoices({ page, limit })
            setInvoices(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePageChange = (page, limit) => {
        loadData(page, limit)
    }

    const columns = [
        { label: 'Invoice Number', name: "invoiceNumber", isNumeric: true },
        { label: 'Date', name: "invoiceDate", isDate: true },
        { label: 'To', name: "client" },
        { label: 'Invoice Type', name: "invoiceType" },
        { label: 'qty', name: "totalQuantity", isNumeric: true },
        { label: ' Amount', name: "totalAmountAfterTax", isNumeric: true, fallBackName: "totalAmountBeforeTax", isCurrency: true, },
    ]

    const navigate = useNavigate()
    return (
        <Box >

            <DataTable
                data={flattenedInvoice(items)}
                columns={columns}
                paginationData={paginationData}
                changePage={handlePageChange}
                changeLimit={handlePageChange}
                actionButton={true}
                actionIcon={<MdRemoveRedEye />}
                onActionButtonClick={(invoice) => navigate("/invoice/" + invoice.id)}
            />

        </Box>
    )
}

export default ViewInvoices
