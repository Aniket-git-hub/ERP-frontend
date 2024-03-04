import BudgetOverview from "../../components/dashboard/budget/BudgetOverview";
import TabsComponent from "../../components/utils/TabsComponent";


function BudgetPage() {
    const tabs = [
        { title: "Overview", component: <BudgetOverview /> },
        { title: "Expenses", component: <BudgetOverview /> },
        { title: "Budgets", component: <BudgetOverview /> },
        { title: "Transactions", component: <BudgetOverview /> },
    ];
    return <TabsComponent tabs={tabs} />
}

export default BudgetPage