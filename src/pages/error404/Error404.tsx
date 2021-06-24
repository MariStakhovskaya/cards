import React from "react";
import s from "./Error404.module.css"
import { NavLink } from "react-router-dom";
import image404 from "./404.png"
import {PATH} from "../../components/routes/Routes";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";

function Error404() {
    return (
        <div className={s.wrapper}>
            <div className={s.image}><img src={image404}
                                          alt="cat"/></div>
            <div className={s.errorText}>Oops, This page does not exist</div>
            <SuperButton><NavLink to={PATH.PROFILE} className={s.back}>go to profile</NavLink></SuperButton>

        </div>
    );
}

export default Error404;

