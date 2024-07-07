import Budget from "../../components/dashboard/budget/Budget"
import BudgetOverview from "../../components/dashboard/budget/BudgetOverview"
import ExpenseOverview from "../../components/dashboard/budget/ExpenseOverview"
import Transaction from "../../components/dashboard/transaction/transaction"
import TabsComponent from "../../components/utils/TabsComponent"

function BudgetPage() {
  const tabs = [
    { title: "Overview", component: <BudgetOverview /> },
    { title: "Expenses", component: <ExpenseOverview /> },
    { title: "Budgets", component: <Budget /> },
    { title: "Transactions", component: <Transaction /> },
  ]
  return <TabsComponent tabs={tabs} />
}

export default BudgetPage
