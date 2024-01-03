import axios from "axios"
import { useEffect, useState } from "react"
axios.defaults.withCredentials = true
let firstRender = true

const Dashboard = () =>{

    const [userDetails, setUserDetails] = useState()

    const refreshToken  = async() =>{
        const res = await axios.get("http://localhost:4000/api/refresh", {
            withCredentials:true
        }).catch((error)=>{console.log(error, "while refreshToken in frontend")})
        const data = await res.data
        return data
    }

    const sendRequest = async() =>{
        const res = await axios.get("http://localhost:4000/api/user", {
            withCredentials:true
        }).catch((error)=>{console.log(error, "while getting data")})
        const data = await res.data
        return data
    }

    useEffect(()=>{
        if(firstRender){
            firstRender = false
            sendRequest().then((data)=>{setUserDetails(data.user)})
        }

        const interval = setInterval(()=>{
            refreshToken().then((data)=>{setUserDetails(data.user)})
        }, 1000*29)

        return ()=>clearInterval(interval)
    },[])

    return(
        <div>
            <h5>Dashboard</h5>
            {userDetails && <h3>{userDetails.name}</h3>}

            <div>
                <button className="btn btn-primary">Add User</button>
            </div>
        </div>
    )
}

export default Dashboard