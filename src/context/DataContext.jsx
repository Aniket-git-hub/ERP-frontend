import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [clients, setClients] = useState([])
    const [materials, setMaterials] = useState([])
    const [jobs, setJobs] = useState([])
    const [invoices, setInvoices] = useState([])
    const [invoiceJob, setInvoiceJobs] = useState([])
    const [clientOptions, setClientOptions] = useState([])
    const [materialOptions, setMaterialOptions] = useState([])
    const [dashboardData, setDashboardData] = useState({})
    const [currentMonthJobAggregate, setCurrentMonthJobAggregate] = useState({})
    const [currentMonthInvoiceAggregate, setCurrentMonthInvoiceAggregate] = useState({})
    const [previousMonthJobAggregate, setPreviousMonthJobAggregate] = useState({})
    const [previousMonthInvoiceAggregate, setPreviousMonthInvoiceAggregate] = useState({})
    const [currentYearJobAggregate, setCurrentYearJobAggregate] = useState({})
    const [currentYearInvoiceAggregate, setCurrentYearInvoiceAggregate] = useState({})
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        if (clients && clients.length > 0) {
            setClientOptions(clients.map((client) => ({ label: client.name, value: client.id })))
        }
        if (materials && materials.length > 0) {
            setMaterialOptions(materials.map((material) => ({ label: material.name, value: material.id })))
        }
    }, [clients, materials])

    return (
        <DataContext.Provider
            value={{
                clients,
                materials,
                jobs,
                invoices,
                invoiceJob,
                clientOptions,
                materialOptions,
                dashboardData,
                currentMonthInvoiceAggregate,
                currentMonthJobAggregate,
                previousMonthJobAggregate,
                previousMonthInvoiceAggregate,
                currentYearJobAggregate,
                currentYearInvoiceAggregate,
                employees,
                setEmployees,
                setCurrentYearInvoiceAggregate,
                setCurrentYearJobAggregate,
                setPreviousMonthJobAggregate,
                setPreviousMonthInvoiceAggregate,
                setCurrentMonthJobAggregate,
                setCurrentMonthInvoiceAggregate,
                setDashboardData,
                setMaterials,
                setClients,
                setJobs,
                setInvoices,
                setInvoiceJobs
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
