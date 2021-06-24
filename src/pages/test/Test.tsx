import React from 'react'
import s from './Test.module.css'
import SuperInput from "../../components/common/c1-SuperInput/SuperInput";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../components/common/c3-SuperCheckbox/SuperCheckbox";


export const Test = () => {
    return (
        <div className={s.content}>
            <div><SuperInput /></div>
            <div><SuperCheckbox /></div>

            <div>
            <SuperButton green >Кнопка</SuperButton>
            </div>
        </div>
    )
}