import { useEffect, useState } from "react"
import "./Tickets.css"
import { useNavigate } from "react-router-dom"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()



const localHoneyUser =localStorage.getItem ("honey_user")
const honeyUserObject = JSON.parse(localHoneyUser)//OBJ with 2 keys -id and staff.

useEffect(
    () => {
        if (emergency){
            const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
            setFiltered(emergencyTickets)
        }
        else {
            setFiltered(tickets) //allows us to show all tickets when emergency is false. 
        }
    },
    [emergency]
)

    useEffect(
        () => {
            fetch (`http://localhost:8088/serviceTickets`)
            .then(response => response.json())
            .then(ticketArray => {
                setTickets (ticketArray)})
            },
        
            //console.log("Initial state of tickets", tickets) // View the initial state of tickets
        
        [] // When this array is empty, you are observing initial component state
    )
useEffect (
    () => {
        if (honeyUserObject.staff){
            // for employees-want to see all tickets
             setFiltered(tickets)
        }
        else {
            //for customers-only want to see own tickets
            const myTickets =tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }
    },
    [tickets]
    )
//whole purpose of use effect is to observe state

useEffect(
    () => {
        if (openOnly){
            const openTicketArray =tickets.filter(ticket => { 
        return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
    })
     setFiltered(openTicketArray)
}
else {
    const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
    setFiltered(myTickets)
}
    },
    [openOnly]
)


//makes a button-- only on staff profile--that when clicked lists emergency tickets.<--emergency only button
//makes a Show all button that shows all tickets on staff profile.
    return<>
    {
        honeyUserObject.staff
        ?<>
        <button onClick={() => {setEmergency(true)}}>Emergency Only</button>
        <button onClick={() => {setEmergency(false)}}>Show All</button>
        </>
        :<>
        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
         <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
         <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
         </>
    } 
    
    <h2>List of Tickets</h2>

    <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket" key={`ticket--${ticket.id}`}>
                                <header>{ticket.description}</header>
                                <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                            </section>
                    }
                )
            }
        </article>
    </>

// return a list of products sort products by name in ascending order

        }
