import React from 'react'
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper, Button} from '@mui/material';
import axios from 'axios';
import TopAppBar from './AppBar';
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';
import { SERVER_HOST } from '../config/global_constants';

const SignUp = () => {
    const paperStyle = {
        padding:"50px 20px",
        width: 600,
        margin: "20px auto",
    }
    const[email, setEmail] = useState('')
    const[name, setName] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[redirectFlag, setRedirectFlag] = useState(false)
    const[errorMessage, setErrorMessage] = useState('')
    const[errorFlag, setErrorFlag] = useState(false)
    const[isUserLogged, setUserLogged] = useState(false)

    const handleOnClick = (e) => {
        e.preventDefault()
        const user = {
            email,
            name,
            password,
        }
        setErrorFlag(false)
        if(confirmPassword !== user.password){
            setErrorFlag(true)
            setErrorMessage("Passwords don't match")
        }else{
            axios.post(`${SERVER_HOST}/users/addUser`, user)
            .then(response =>{
                setRedirectFlag(true)
            })
            .catch(error =>{
                setErrorFlag(true)
                setErrorMessage(error.response.data)
            })
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if(user.accessLevel!==0){
            setUserLogged(true) 
        }
    },[])

return(
    <div className="SignUp">
        <TopAppBar/>
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Create an account.</h1>
                    <Box
                     component="form"
                     sx={{
                         '& > :not(style)': { m: 'auto', mt: 1, width: '40ch' },
                     }}
                     noValidate
                     autoComplete="off"
                    >
                        <TextField label="E-mail" variant="outlined"
                            value={email}
                            onChange = {(e) => {
                                setEmail(e.target.value)
                            }}/><br/>
                        <TextField label="Full name" variant="outlined"
                            value={name}
                            onChange = {(e) => {
                                setName(e.target.value)
                            }}/><br/>
                        <TextField label="Password" variant="outlined" type="password"
                            value={password}
                            onChange = {(e) => {
                                setPassword(e.target.value)
                            }}/><br/>
                        <TextField label="Confirm password" variant="outlined" type="password"
                            value={confirmPassword}
                            onChange = {(e) => {
                                setConfirmPassword(e.target.value)
                            }}/><br/>
                        {errorFlag ? <Typography color="red">{errorMessage}</Typography> : ''}
                        <Button variant="outlined" color="success" onClick = {handleOnClick}>Sign up</Button><br/>
                        Already have an account? <Link to="/LogIn">Sign in!</Link>
                    </Box>
            </Paper>
        </Container>
        {redirectFlag ? <Navigate to="/login"/> : "" }
        {isUserLogged ? <Navigate to="/homepage"/> : "" }
    </div>
    );
}

export default SignUp;