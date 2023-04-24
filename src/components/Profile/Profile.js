//This is where we are checking to see if staff or customer. Because customer form will have different field inputs than employee. 

import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"



export const Profile = () => {
    const localHoneyUser =localStorage.getItem ("honey_user") //gets item out of local storage and then parse it into OBJ
    const honeyUserObject = JSON.parse(localHoneyUser)//OBJ with 2 keys -id and staff.

    if (honeyUserObject.staff){
       
         return <EmployeeForm/>
    }
    else{
       
        return <CustomerForm/>
    }


}