import React, { createContext, useEffect, useState } from "react"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [clients, setClients] = useState([])
  const [materials, setMaterials] = useState([])
  const [jobs, setJobs] = useState([])
  const [operations, setOperations] = useState([])
  const [invoices, setInvoices] = useState([])
  const [invoiceJob, setInvoiceJobs] = useState([])
  const [clientOptions, setClientOptions] = useState([])
  const [materialOptions, setMaterialOptions] = useState([])
  const [dashboardData, setDashboardData] = useState({})
  const [currentMonthJobAggregate, setCurrentMonthJobAggregate] = useState({})
  const [currentMonthInvoiceAggregate, setCurrentMonthInvoiceAggregate] =
    useState({})
  const [previousMonthJobAggregate, setPreviousMonthJobAggregate] = useState({})
  const [previousMonthInvoiceAggregate, setPreviousMonthInvoiceAggregate] =
    useState({})
  const [currentYearJobAggregate, setCurrentYearJobAggregate] = useState({})
  const [currentYearInvoiceAggregate, setCurrentYearInvoiceAggregate] =
    useState({})
  const [employees, setEmployees] = useState([])
  const [employeeOptions, setEmployeeOptions] = useState([])
  const [department, setDepartment] = useState([])
  const [designation, setDesignation] = useState([])
  const [designationByDepartment, setDesignationByDepartment] = useState([])
  const [expenseCategories, setExpenseCategories] = useState([])
  const [expenses, setExpenses] = useState([])
  const [budgets, setBudgets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [scrapSell, setScrapSell] = useState([])
  const [advances, setAdvances] = useState([])

  useEffect(() => {
    if (clients && clients.length > 0) {
      setClientOptions(
        clients.map((client) => ({ label: client.name, value: client.id })),
      )
    }
    if (materials && materials.length > 0) {
      setMaterialOptions(
        materials.map((material) => ({
          label: material.name,
          value: material.id,
        })),
      )
    }
  }, [clients, materials])

  return (
    <DataContext.Provider
      value={{
        clientOptions,
        materialOptions,
        materials,
        setMaterials,
        clients,
        setClients,
        jobs,
        setJobs,
        operations,
        setOperations,
        invoices,
        setInvoices,
        invoiceJob,
        setInvoiceJobs,
        dashboardData,
        setDashboardData,
        currentMonthInvoiceAggregate,
        setCurrentMonthInvoiceAggregate,
        currentMonthJobAggregate,
        setCurrentMonthJobAggregate,
        previousMonthJobAggregate,
        setPreviousMonthInvoiceAggregate,
        previousMonthInvoiceAggregate,
        setPreviousMonthJobAggregate,
        currentYearJobAggregate,
        setCurrentYearJobAggregate,
        currentYearInvoiceAggregate,
        setCurrentYearInvoiceAggregate,
        employees,
        setEmployees,
        designation,
        setDesignation,
        designationByDepartment,
        setDesignationByDepartment,
        department,
        setDepartment,
        expenseCategories,
        setExpenseCategories,
        expenses,
        setExpenses,
        budgets,
        setBudgets,
        transactions,
        setTransactions,
        scrapSell,
        setScrapSell,
        employeeOptions,
        setEmployeeOptions,
        advances,
        setAdvances,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
