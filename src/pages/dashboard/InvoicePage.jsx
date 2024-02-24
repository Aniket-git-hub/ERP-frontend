import CreateInvoice from "../../components/dashboard/invoices/createInvoice";
import ViewInvoices from "../../components/dashboard/invoices/viewInvoices";
import TabsComponent from "../../components/utils/TabsComponent";

function InvoicePage() {
    const tabs = [
        { title: "View Invoices", component: <ViewInvoices /> },
        { title: "Create Invoices", component: <CreateInvoice /> },
    ];
    return <TabsComponent tabs={tabs} />
}

export default InvoicePage