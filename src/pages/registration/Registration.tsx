import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import c from '../../components/common/commonStyle/commonStyle.module.css'
import {AppRootState} from "../../redux/store";
import {RequestStatusType} from "../../redux/appReducer";
import {PATH} from "../../components/routes/Routes";
import SuperInputText from "../../components/common/c1-SuperInput/SuperInput";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import {singUp} from "../../redux/registrationReducer";
import {Preloader} from "../../components/common/preloader/Preloader";


export const Registration = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
    type FormErrorType = {
        email?: string
        password?: string
        checkPassword?: string
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            checkPassword: '',
        },
        validate: (values) => {
            const errors: FormErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Must be 7 characters at least';
            }
            if (!values.checkPassword) {
                errors.checkPassword = 'Required';
            } else if (values.checkPassword !== values.password) {
                errors.checkPassword = 'Passwords should be equal';
            }
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            alert(JSON.stringify(values))
            dispatch(singUp(values.email, values.password))
        },
    })



    if (isLoading === 'succeeded') {
        return <Redirect to={PATH.LOGIN} />
    }

    return (
        <div className={c.wrap}>
            <form onSubmit={formik.handleSubmit} className={c.formBlock}>
                <div>
                    <h3>Registration</h3>
                </div>
                <SuperInputText
                    placeholder={'Email'}
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email &&
                formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                <SuperInputText
                    type={'password'}
                    placeholder={'Password'}
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password &&
                formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                <SuperInputText
                    type={'password'}
                    placeholder={'Password'}
                    {...formik.getFieldProps('checkPassword')}
                />
                {formik.touched.checkPassword &&
                formik.errors.checkPassword ? <div style={{ color: 'red' }}>{formik.errors.checkPassword}</div> : null}
                <div>
                    {isLoading === 'loading' ? <Preloader /> : <SuperButton type={'submit'} title={'sign up'} />}
                </div>

            </form>
        </div>
    )
}
