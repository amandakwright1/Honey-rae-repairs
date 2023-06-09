import { useEffect, useState } from "react"

export const EmployeeForm = () => {
    // Provide initial state for profile
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0,
    })

    const localHoneyUser =localStorage.getItem ("honey_user") //gets item out of local storage and then parse it into OBJ
    const honeyUserObject = JSON.parse(localHoneyUser)//OBJ with 2 keys -id and staff.


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
             return fetch(`http://localhost:8088/employees/${profile.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(profile)
             })
                 .then(response => response.json())
                 .then (() => {
                       //Do nothing
                 })
    }



    // TODO: Get employee profile info from API and update state
      useEffect (() =>
          fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
          .then(response => response.json())
          .then((data) => {
                const employeeObject = data [0]
                updateProfile(employeeObject)
          })
        , [])

    return(
        <form className="profile">
            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.specialty = evt.target.value
                                updateProfile(copy)
                                //  Update specialty property
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.rate = parseFloat(evt.target.value,2)
                                updateProfile(copy)
                                //  Update rate property
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}