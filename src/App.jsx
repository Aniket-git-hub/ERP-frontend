import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  getAggregateInvoiceData,
  getAggregateJobData,
  getClients,
  getEmployees,
  getInvoices,
  getJobs,
  getMaterials
} from './api/data';
import { useAuth } from './hooks/useAuth';
import { useData } from './hooks/useData';
import RootLayout from './layouts/RootLayout';
import Error404Page from './pages/Error404Page';
import LoginPage from './pages/auth/LoginPage';
import AboutusPage from './pages/dashboard/AboutusPage';
import AttendancePage from './pages/dashboard/AttendancePage';
import BudgetPage from './pages/dashboard/BudgetPage';
import ClientsPage from './pages/dashboard/ClientsPage';
import EmployeePage from './pages/dashboard/EmployeePage';
import FeedbackPage from './pages/dashboard/FeedbackPage';
import HomePage from './pages/dashboard/HomePage';
import InvoicePage from './pages/dashboard/InvoicePage';
import JobsPage from './pages/dashboard/JobsPage';
import MaterialsPage from './pages/dashboard/MaterialsPage';
import SettingsPage from './pages/dashboard/SettingsPage';

function App() {
  const { user, setUser, isAuthenticated, verifyOTP } = useAuth();
  const {
    clients,
    materials,
    invoices,
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
            employees
          ] = await Promise.all([
            getMaterials(),
            getClients(),
            getJobs({ page: 1, limit: 10 }),
            getInvoices({ page: 1, limit: 10 }),
            getAggregateJobData('monthly', currentYear.toString(), currentMonth.toString()),
            getAggregateInvoiceData('monthly', currentYear.toString(), currentMonth.toString()),
            getAggregateJobData('monthly', previousYear.toString(), previousMonth.toString()),
            getAggregateInvoiceData('monthly', previousYear.toString(), previousMonth.toString()),
            getAggregateJobData('yearly', currentYear.toString()),
            getAggregateInvoiceData('yearly', currentYear.toString()),
            getEmployees()
          ]);

          const { data: { materials } } = materialsResponse;
          const { data: { items } } = clientsResponse;
          const { data: jobsData } = jobsResponse;
          const { data: invoiceData } = invoicesResponse;

          setMaterials(materials);
          setClients(items);
          setJobs(jobsData);
          setInvoices(invoiceData.items);
          setCurrentMonthJobAggregate(currentMonthJobAggregate.data)
          setCurrentMonthInvoiceAggregate(currentMonthInvoiceAggregate.data);
          setPreviousMonthJobAggregate(previousMonthJobAggregate.data)
          setPreviousMonthInvoiceAggregate(previousMonthInvoiceAggregate.data)
          setCurrentYearJobAggregate(currentYearJobAggregate.data)
          setCurrentYearInvoiceAggregate(currentYearInvoiceAggregate.data);
          setEmployees(employees.data.employees)
        }
      } catch (error) {
        console.log(error);
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
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="employee" element={<EmployeePage />} />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="about-us" element={<AboutusPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
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
