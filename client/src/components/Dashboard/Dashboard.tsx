import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import TrainSearch from "../TrainSearch/TrainSearch";
import { motion } from 'framer-motion'

import './Dashboard.css'

function Dashboard() {

    const navigate = useNavigate();

    const [manageProf, setManageProf] = useState(false);
    // const [showDiv, setShowDiv] = useState(false);

    function decode(token: string) {
        try {
            const tokenValue = JSON.parse(window.atob(token.split(".")[1]));
            // console.log(tokenValue);
            return tokenValue;
        } catch (e) {
            return undefined;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login');
        }
        const user = decode(token!);
        if (user === undefined) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        console.log("manageProf:", manageProf); // Log state value for verification
    }, [manageProf]);

    const user=decode(localStorage.getItem('token')!);
    const {name}=user;

    return (
        <>
            <div className="dashboard">
                <h1 className="dashboard-hello">Hello {name}</h1>
            </div>
            <div className="dashboard-container">
                <span className="db-trains">
                    <TrainSearch />
                </span>
                <span className="db-seperate">
                </span>
                <span className="db-user-actions">

                    <div className="db-option">
                        <button>
                            <img className="db-opt-logo" width="64" height="64" src="https://img.icons8.com/nolan/64/search.png" alt="search" />
                            <p>
                                Check PNR
                            </p>
                        </button>
                    </div>

                    <div className="db-option">
                        <button>
                            <img className="db-opt-logo" width="64" height="64" src="https://img.icons8.com/nolan/64/event-accepted.png" alt="event-accepted" />
                            <p>
                                View your Bookings
                            </p>
                        </button>
                    </div>

                    <div className="db-option">
                        <button>
                            <img className="db-opt-logo" width="64" height="64" src="https://img.icons8.com/nolan/64/cancel.png" alt="cancel" />
                            <p>
                                Cancel your Tickets
                            </p>
                        </button>
                    </div>

                    <div className="db-option">
                        <button onClick={() => { setManageProf(!manageProf) }}>
                            <img className="db-opt-logo" width="64" height="64" src="https://img.icons8.com/nolan/64/admin-settings-male.png" alt="admin-settings-male" />
                            <p>
                                Manage Profile
                            </p>
                        </button>
                    </div>
                </span>

                {/* <AnimatePresence> */}
                {manageProf && (<>
                    <motion.span
                        className="db-seperate"
                        animate={{ opacity: 1, x:0 }}
                        initial={{ opacity: 0, x:100 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                    </motion.span>
                    <motion.span
                        className="db-manage"
                        animate={{ opacity: 1, x:0 }}
                        initial={{ opacity: 0, x:100 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="db-manage-option">
                            <button>
                                <img width="32" height="32" src="https://img.icons8.com/nolan/64/key.png" alt="key" />                                <p>
                                    Change Password
                                </p>
                            </button>
                        </div>
                        <div className="db-manage-option">
                            <button>
                                <img width="30" height="32" src="https://img.icons8.com/nolan/64/delete-forever.png" alt="delete-forever" />                                <p>
                                    Delete Profile
                                </p>
                            </button>
                        </div>
                        <div className="db-manage-option">
                            <button>
                                <img width="32" height="32" src="https://img.icons8.com/nolan/64/exit.png" alt="exit" />                                <p>
                                    Log Out
                                </p>
                            </button>
                        </div>
                    </motion.span>
                </>
                )}
                {/* </AnimatePresence> */}
            </div>
        </>
    );
}

export default Dashboard;