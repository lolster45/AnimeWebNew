//React...
import React, { useEffect, useState } from 'react';

//React icons...
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaCheck, FaBan } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { HiSwitchHorizontal } from "react-icons/hi";

//Styles...
import "../styles/AdminDash.scss"

const AdminDashBoard = () => {

    const [users, setUsers] = useState([]);
    // State for user input
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        const response = await fetch('/api/admin-dashboard', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        const res = await response.json();
        setUsers(res)
    }
    const changeAccountStatus = async (user) => {
        const data = await fetch('/api/admin-dashboard', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uid: user.id,
                accStatus: user.disabled
            })
        });


        const res = await data.json();

        if(res.status) {
            setUsers(prev =>
                prev.map(obj =>
                    obj.id === user.id ? { ...obj, disabled: !user.disabled } : obj
                )
            );
            console.log("successfully changed acc status...")
        }
        else {
            console.log("could not change acc status...")
        }

    }

    // Filtered items based on search term
    const filteredItems = users.filter(user =>
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle input change
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };


    useEffect(() => {
       fetchUsers();
    }, [])


    return (
        <section className='admin-dash'>
            Dashboard of admin things...
            <button onClick={() => console.log(users)}>CLICK ME</button>
            <div className='all-users-table'>
                <div>
                    <div className='search-bar-wrap'>
                        <input onChange={handleChange} type="text" placeholder='Search Users By ID...' />
                        <HiMagnifyingGlass/>
                    </div>

                </div>
                <section border="0" className='users-table'>
                    <div className='user-row table-titles'>
                        <span>ID</span>
                        <span>EMAIL</span>
                        <span>STAT</span>
                        <span><FaBan/></span>
                    </div>
                    <div className="users-wrap">
                        {
                        filteredItems.map(user => {
                            return (
                                <div className='user-row scroll'>
                                    <span>{user.id}</span>
                                    <span>{user.email}</span>
                                    <span>
                                        {
                                            user.disabled ? 
                                            <TiDeleteOutline className='red'/> 
                                            : <FaCheck className='green'/>
                                        }
                                    </span>
                                    <span>
                                        <HiSwitchHorizontal onClick={() => changeAccountStatus(user)}/>
                                    </span>
                                </div>
                            )
                        })
                        }
                    </div>
                </section> 
            </div>
        </section>
    );
};

export default AdminDashBoard;