import React from 'react';
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function ({role_level}){
    if(role_level == 4){
        return (
            <div  className={
                'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
            }>
                <Dropdown>
                    <Dropdown.Trigger>
                        Admin
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Link href={route('home') }method="get">
                            User
                        </Dropdown.Link>
                        <Dropdown.Link href={route('Admin Bulletin')}method="get">
                            Bulletin
                        </Dropdown.Link>
                        <Dropdown.Link href={route('home') }method="get">
                            Home
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        )
    }
    return(null)
}
