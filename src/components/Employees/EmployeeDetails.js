import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const {employeeId} = useParams() //useParams grabs the # out of url.
    const [employee, updateEmployee] = useState()

    useEffect( //fetches data and updates state. Fetches a single employee Id.
        () => {
        fetch (`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
            .then(response => response.json())
            .then ((data) => {
               const singleEmployee = data [0]
               updateEmployee(singleEmployee)
            })
        },
        [employeeId] // run this use effect when employeeId changes. So only renders that part and does not refresh whole page. Empty means run it one time. 
    )

//updates JSX to render all properties on that object
    return <section className="employee"> 
    <header className="employee_header">{employee?.user?.fullName}</header>
    <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Rate: {employee.rate}</div>
    <footer className="employee_footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
 </section>
}