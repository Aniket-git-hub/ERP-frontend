import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getEmployeesAttendance } from "../../../api/endpoints/employee/attendances";
import DataTable from "../../utils/DataTable";

function ViewAttendance() {
    const [data, setData] = useState([]);

    const loadAttendanceData = async () => {
        try {
            const res = await getEmployeesAttendance({
                page: 1,
                limit: 30
            });
            setData(res.data.items);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadAttendanceData();
    }, []);

    const flattenedAttendance = (item) => {
        if (!item || (item && item.length < 1)) return []
        return item.map(a => {
            const flattenAttendance = { ...a };
            if (a.employee && typeof a.employee === 'object') {
                flattenAttendance.employee = a.employee.name;
            }

            return flattenAttendance;
        })
    }

    let cols = [
        { label: 'Employee', name: 'employee', },
        { label: 'Date', name: 'date', isDate: true },
        { label: 'InTime', name: 'checkInTime', isTime: true },
        { label: 'OutTime', name: 'checkOutTime', isTime: true },
        { label: 'Hours', name: 'totalHours', isNumeric: true },
        { label: 'overTime', name: 'overtime', isNumeric: true }
        // { label: 'overTime', name: 'totalHours', isNumeric: true }
    ];

    return (
        <Flex w={"100%"}>
            <DataTable columns={cols} data={flattenedAttendance(data)} />
        </Flex>
    );
}

export default ViewAttendance;
