import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Form from 'react-bootstrap/Form'
import './SignUpForm.scss'
import { Button } from '@mui/material'

interface Props {
    handleRegister: (
        email: string,
        password: string,
        name: string
    ) => Promise<void>
}

const SignUpForm = ({ handleRegister }: Props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            name: Yup.string().min(3, 'Uncorrected name').required('Required'),
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

                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    id="name"
                    name="name"
                    type="name"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="required">{formik.errors.name}</div>
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

                <Button
                    onClick={() =>
                        handleRegister(
                            formik.values.email,
                            formik.values.password,
                            formik.values.name
                        )
                    }
                    variant="contained"
                    color="success"
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm
