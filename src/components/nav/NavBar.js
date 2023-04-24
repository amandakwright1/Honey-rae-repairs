import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localHoneyUser =localStorage.getItem ("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)//OBJ with 2 keys -id and staff.

    if (honeyUserObject.staff){
        //Return employee view
         return <EmployeeNav />
    }
    else{
        //Return customer views
        return <CustomerNav />
    }


}

