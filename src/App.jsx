import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { getBudgets } from './api/endpoints/budget/budget';
import { getExpenseCategories } from './api/endpoints/budget/expenseCategories';
import { getExpenses } from './api/endpoints/budget/expenses';
import { getTransactions } from './api/endpoints/budget/transactions';
import { getAdvances } from './api/endpoints/employee/advances';
import { getAllDepartment } from './api/endpoints/employee/department';
import { getAllDesignation, getAllDesignationByDepartment } from './api/endpoints/employee/designation';
import { getEmployeeOptions, getEmployees } from './api/endpoints/employee/employees';
import { getClients } from './api/endpoints/work/clients';
import { getAggregateInvoiceData, getInvoices } from './api/endpoints/work/invoices';
import { getAggregateJobData, getJobs } from './api/endpoints/work/jobs';
import { getMaterials } from './api/endpoints/work/materials';
import { getOperations } from './api/endpoints/work/operations';
import { getScrapSell } from './api/endpoints/work/scrapSellAPI';
import InvoiceById from './components/dashboard/invoices/InvoiceById';
import { useAuth } from './hooks/useAuth';
import { useData } from './hooks/useData';
import RootLayout from './layouts/RootLayout';
import Error404Page from './pages/Error404Page';
import LoginPage from './pages/auth/LoginPage';
import AboutusPage from './pages/dashboard/AboutusPage';
import BudgetPage from './pages/dashboard/BudgetPage';
import ClientsPage from './pages/dashboard/ClientsPage';
import EmployeePage from './pages/dashboard/EmployeePage';
import FeedbackPage from './pages/dashboard/FeedbackPage';
import HomePage from './pages/dashboard/HomePage';
import InvoicePage from './pages/dashboard/InvoicePage';
import JobsPage from './pages/dashboard/JobsPage';
import MaterialsPage from './pages/dashboard/MaterialsPage';
import ScrapPage from './pages/dashboard/ScrapPage';
import SettingsPage from './pages/dashboard/SettingsPage';

function App() {
  const { user, setUser, isAuthenticated, verifyOTP } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams()

  const {
    setExpenseCategories,
    setExpenses,
    setBudgets,
    setInvoices,
    setJobs,
    setClients,
    setMaterials,
    setCurrentMonthInvoiceAggregate,
    setCurrentMonthJobAggregate,
    setPreviousMonthJobAggregate,
    setPreviousMonthInvoiceAggregate,
    setCurrentYearJobAggregate,
    setCurrentYearInvoiceAggregate,
    setEmployees,
    setTransactions,
    setScrapSell,
    setEmployeeOptions,
    setAdvances,
    setOperations,
    setDepartment,
    setDesignation,
    setDesignationByDepartment
  } = useData();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (isAuthenticated) {
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1;
          const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
          const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

          const [
            materialsResponse,
            clientsResponse,
            jobsResponse,
            invoicesResponse,
            currentMonthJobAggregate,
            currentMonthInvoiceAggregate,
            previousMonthJobAggregate,
            previousMonthInvoiceAggregate,
            currentYearJobAggregate,
            currentYearInvoiceAggregate,
            employees,
            expenses,
            expenseCategories,
            budgets,
            transactions,
            scrapSell,
            employeeOptions,
            advances,
            operations,
            designation,
            department,
            designationByDepartment
          ] = await Promise.all([
            getMaterials(),
            getClients(),
            getJobs({ page: searchParams.get("page") || 1, limit: searchParams.get("limit") || 10 }),
            getInvoices({ page: searchParams.get("page") || 1, limit: searchParams.get("limit") || 10 }),
            getAggregateJobData('monthly', currentYear.toString(), currentMonth.toString()),
            getAggregateInvoiceData('monthly', currentYear.toString(), currentMonth.toString()),
            getAggregateJobData('monthly', previousYear.toString(), previousMonth.toString()),
            getAggregateInvoiceData('monthly', previousYear.toString(), previousMonth.toString()),
            getAggregateJobData('yearly', currentYear.toString()),
            getAggregateInvoiceData('yearly', currentYear.toString()),
            getEmployees(),
            getExpenses(),
            getExpenseCategories(),
            getBudgets(),
            getTransactions(),
            getScrapSell(),
            getEmployeeOptions(),
            getAdvances(),
            getOperations(),
            getAllDesignation(),
            getAllDepartment(),
            getAllDesignationByDepartment()
          ]);

          const { data: { materials } } = materialsResponse;
          const { data: jobsData } = jobsResponse;
          const { data: invoiceData } = invoicesResponse;

          setMaterials(materials);
          setClients(clientsResponse.data.items);
          setJobs(jobsData);
          setInvoices(invoiceData);
          setCurrentMonthJobAggregate(currentMonthJobAggregate.data)
          setCurrentMonthInvoiceAggregate(currentMonthInvoiceAggregate.data);
          setPreviousMonthJobAggregate(previousMonthJobAggregate.data)
          setPreviousMonthInvoiceAggregate(previousMonthInvoiceAggregate.data)
          setCurrentYearJobAggregate(currentYearJobAggregate.data)
          setCurrentYearInvoiceAggregate(currentYearInvoiceAggregate.data);
          setEmployees(employees.data.employees)
          setExpenseCategories(expenseCategories.data.expenseCategories)
          setExpenses(expenses.data.expenses)
          setBudgets(budgets.data.budgets)
          setTransactions(transactions.data.transactions)
          setScrapSell(scrapSell.data)
          setEmployeeOptions(employeeOptions.data.employees)
          setAdvances(advances.data.advances)
          setOperations(operations.data.operations)
          setDesignation(designation.data.designations)
          setDepartment(department.data.departments)
          setDesignationByDepartment(designationByDepartment.data.designations)
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [user, isAuthenticated]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <RootLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route index element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="invoices" element={<InvoicePage />} />
        <Route path="invoice/:invoiceId" element={<InvoiceById />} />
        <Route path="employee" element={<EmployeePage />} />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="scrap" element={<ScrapPage />} />
        <Route path="about-us" element={<AboutusPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="*" element={<Error404Page />} />
      </Route>
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <LoginPage />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default App;
