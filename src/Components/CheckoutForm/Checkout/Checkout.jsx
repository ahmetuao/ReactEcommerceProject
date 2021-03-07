import React, { useState, useEffect } from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './Styles';
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping Adress', 'Payment Details'];

const Checkout = () => {
    const classes = useStyles();
    const [activeStep, setaActiveStep] = useState(1);

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )

    const Form = () => (activeStep === 0
        ? <AdressForm />
        : <PaymentForm />
    )

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={1} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
