import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Form from 'react-bootstrap/Form'

import './LoginForm.scss'
import { Button } from '@mui/material'

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .max(13, 'Password must be 13 numbers or less')
                .required('Required'),
        }),
        onSubmit: () => {
            console.log('sucseess')
        },
    })

    return (
        <div className="form">
            <Form onSubmit={formik.handleSubmit}>
                <Form.Label htmlFor="email">Email Address</Form.Label>
                <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="required">{formik.errors.email}</div>
                )}

                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="required">{formik.errors.password}</div>
                )}

                <Button variant="contained" color="success">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm
