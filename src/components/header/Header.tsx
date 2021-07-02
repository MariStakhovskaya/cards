import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Header.module.css"
import {PATH} from "../routes/Routes";
export const Header = () => {
    return (

        <div className={s.header}>
        <NavLink to={PATH.LOGIN} activeClassName={s.active} className={s.menu}>login</NavLink>
        <NavLink to={PATH.REGISTRATION} className={s.menu} activeClassName={s.active}>registration</NavLink>
        <NavLink to={PATH.PROFILE} className={s.menu} activeClassName={s.active}>profile</NavLink>
        <NavLink to={PATH.NEW_PASSWORD} className={s.menu} activeClassName={s.active}>New Password</NavLink>
        <NavLink to={PATH.PASSWORD_RECOVERY} className={s.menu} activeClassName={s.active}>Recovery password</NavLink>
        <NavLink to={PATH.TEST_COMPONENT} className={s.menu} activeClassName={s.active}>test</NavLink>
    </div>

    )
}


