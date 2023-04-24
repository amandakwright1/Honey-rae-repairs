import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer"
import { EmployeeList } from "../Employees/EmployeeList"
import { EmployeeDetails } from "../Employees/EmployeeDetails"
import { CustomerList } from "../Customer/CustomerList"
import { Profile } from "../Profile/Profile"


export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="profile" element={ < Profile /> } /> 
                <Route path="tickets" element={ < TicketContainer /> } /> 
                <Route path="employees" element={ < EmployeeList /> } /> 
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } /> 
                <Route path="customers" element={ <CustomerList /> } /> 
            </Route>
        </Routes>
    )
}

