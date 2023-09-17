import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authLogout } from "../../../../../store/store-auth";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CategoryIcon from '@mui/icons-material/Category';
import BedIcon from '@mui/icons-material/Bed';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import classes from "./Dashboard-Tab-Component.module.css";

const DashboardTabComponent = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogoutHandler = (event) => {
        dispatch(authLogout());
        navigate("/auth");
    }

    return (
        <div className={classes['dashboard-tab-component']}>
            <div className={classes['tab-container']}>
                <ul className={classes['tab-main']}>
                    <li>
                        <h2>Main</h2>
                        <ul className={classes['tab-content']}>
                            <li>
                                <NavLink to='' className={({ isActive }) => isActive ? classes["active"] : ""}><DashboardIcon /> Dashboard</NavLink>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <h2>Lists</h2>
                        <ul className={classes['tab-content']}>
                            <li><NavLink to="users" className={({ isActive }) => isActive ? classes["active"] : ""}><SupervisedUserCircleIcon /> Users</NavLink></li>
                            <li><NavLink to="locations" className={({ isActive }) => isActive ? classes["active"] : ""}><MyLocationIcon />Locations</NavLink></li>
                            <li><NavLink to="categorys" className={({ isActive }) => isActive ? classes["active"] : ""}><CategoryIcon />Categories</NavLink></li>
                            <li><NavLink to="hotels" className={({ isActive }) => isActive ? classes["active"] : ""}><HomeWorkOutlinedIcon /> Hotels</NavLink></li>
                            <li><NavLink to="rooms" className={({ isActive }) => isActive ? classes["active"] : ""}><BedIcon /> Rooms</NavLink></li>
                            <li><NavLink to="roles" className={({ isActive }) => isActive ? classes["active"] : ""}><AdminPanelSettingsIcon /> Roles</NavLink></li>
                        </ul>
                    </li>

                    <li>
                        <h2>New</h2>
                        <ul className={classes['tab-content']}>
                            <li><NavLink to="new-location" className={({ isActive }) => isActive ? classes["active"] : ""}><MyLocationIcon /> New Location</NavLink></li>
                            <li><NavLink to="new-category" className={({ isActive }) => isActive ? classes["active"] : ""}><CategoryIcon /> New category</NavLink></li>
                            <li><NavLink to="new-hotel" className={({ isActive }) => isActive ? classes["active"] : ""}><HomeWorkOutlinedIcon /> New Hotel</NavLink></li>
                            <li><NavLink to="new-room" className={({ isActive }) => isActive ? classes["active"] : ""}><BedIcon /> New Room</NavLink></li>
                            <li><NavLink to="new-user" className={({ isActive }) => isActive ? classes["active"] : ""}><PersonOutlineOutlinedIcon /> New User</NavLink></li>
                            <li><NavLink to="new-role" className={({ isActive }) => isActive ? classes["active"] : ""}><AdminPanelSettingsIcon /> New Role</NavLink></li>
                        </ul>
                    </li>

                    <li>
                        <h2>User</h2>
                        <ul className={classes['tab-content']}>
                            <li>
                                <button onClick={userLogoutHandler} className={classes['tab-btn']}><ExitToAppOutlinedIcon /> Logout</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardTabComponent;