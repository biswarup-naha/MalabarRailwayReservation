import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import TrainSearch from "../TrainSearch/TrainSearch";

function Dashboard() {
    
    const navigate = useNavigate();

    function decode(token: string) {
        try {
            const tokenValue = JSON.parse(window.atob(token.split(".")[1]));
            console.log(tokenValue);
            return tokenValue;
        } catch (e) {
            return undefined;
        }
    }

    async function showDashboard() {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:6969/api/showDashboard', {
            headers: {
                'x-access-token' : token!,
            }
        })
    }

    useEffect( ()=>{
        const token = localStorage.getItem('token');
        if(!token){
            navigate('login');
        }
        const user = decode(token!);
        if( user === undefined){
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            showDashboard()
        }
    }, [navigate] );

    return (
        <>
        <div>
            <h1>Login was succesful, this is your Dashboard</h1>
            <p>Thank you for visiting</p>
        </div>
        <br />
        <br />
        <TrainSearch />
        </>
    );
}

export default Dashboard;