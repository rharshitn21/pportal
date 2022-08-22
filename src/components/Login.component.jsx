import React, { useEffect, useState } from 'react';
import Image from "../image.png";
import {Navigate, useNavigate} from "react-router-dom";
import Axios from 'axios';

function Info() {
    return (
        <div className="col-lg-6 mb-5 mb-lg-0 align-items-center" style={{"zIndex": "10"}}>
                    <h1 className="my-5 display-5 fw-bold ls-tight" style={{"color": "hsl(218, 81%, 95%)"}}>
                        A Final Stop <br />
                    <span style={{"color": "hsl(218, 81%, 75%)"}}>for your Placement Info</span>
                    </h1>
                    <p className="mb-4 opacity-70" style={{"color": "hsl(218, 81%, 85%)"}}>
                        This portal will keep you updated with all your placement updates in one place.
                    </p>
        </div>
    );
}



function Register(props) {
    const Branches = ["CSE", "IT", "CCE", "ECE", "EEE", "Mech", "BIO-TECH", "Civil"];
    const [registerInput, setRegisterInput] = useState({
        username: "",
        password: "",
        branch: "",
    });


    function inputOnChange(e){
        props.setError("");
        setRegisterInput((prevValue)=>{
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        });
    }

    function formSubmit(e) {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerInput)
        };

        fetch('http://localhost:5000/user/register', requestOptions)
            .then(response => (response.json()))
            .then(x => {
                if(x.code === 406) {
                    props.setError(x.message);
                }
                else {
                    // redirect to login page
                    props.redirect(false);

                }
            });
        
        e.preventDefault();
    }

    return (
        <form onSubmit={formSubmit}>
                <div className="form-outline mb-4">
                    {/* <label className="form-label" for="form3Example3">Email address</label> */}
                    <input type="email" id="form3Example3" className="form-control" name="username" onChange={inputOnChange} placeholder="Email address" required/>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form3Example4" className="form-control" name="password" onChange={inputOnChange} placeholder="Password" required/>
                    {/* <label className="form-label" for="form3Example4">Password</label> */}
                </div>

                <div className="form-outline mb-4">
                    {/* <label className="form-label" for="form3Example1">Branch</label> */}
                    <select className="form-select" aria-label="Default select example" name="branch" onChange={inputOnChange} placeholder="select a branch" defaultValue={'DEFAULT'} required>
                        <option value={"DEFAULT"} disabled hidden>Select a Branch</option>
                        {
                            Branches.map((b, i)=>{
                                return <option key={i}>{b}</option>;
                            })
                        }
                    </select>
                </div>

                {/* <div className='form-outline mb-4'> */}
                    <button type="submit" className="btn btn-block btn-primary mb-2" style={{width: "100%"}}>
                        Sign up
                    </button>
                {/* </div> */}
                
            </form>
    );
}



function Login(props)  {

    const [loginInput, setLoginInput] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    async function loginSubmit(e) {

        e.preventDefault();
        // headers: {'Content-Type': 'application/json'},
        const requestOptions = {
            method: "POST",
            withCredentials: true,
            url: 'http://localhost:5000/user/login',
            data:  loginInput
        };

        const result = await Axios(requestOptions);
        const resp = await result.data;
        
        // console.log(resp);
        if(resp.code === 401) {
            props.setError("Incorrect Username or Password");
        }
        else if(resp.code === 200) {

            const res = await Axios({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:5000/user/getUser'
            });
            // console.log(res);
            const userData = await res.data;

            if(userData.access === "user") {
                navigate(("/user/" + userData.id));
            }
            else if (userData.access === "admin") {
                navigate("/admin");
            }
        }
        
    }




    function inputOnChange(e) {
        props.setError("");
        setLoginInput((prev)=>{
            return ({
                ...prev,
                [e.target.name]: e.target.value
            });
        });
    }

    return (
        <form onSubmit={loginSubmit}>
                <div className="form-outline mb-4">
                    {/* <label className="form-label" for="form3Example3">Email address</label> */}
                    <input type="email" id="form3Example3" className="form-control" name="username" onChange={inputOnChange} placeholder="Username" required value={loginInput.username}/>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form3Example4" className="form-control" name="password" onChange={inputOnChange} placeholder="Password" value={loginInput.password} required/>
                    {/* <label className="form-label" for="form3Example4">Password</label> */}
                </div>

                {/* <div className='form-outline mb-4'> */}
                    <button type="submit" className="btn btn-block btn-primary mb-2" style={{width: "100%"}}>
                        Sign In
                    </button>
                {/* </div> */}
                
            </form>
    );
}




function ErrorCard(props) {
    return (
        <div className="card border-danger mb-3">
            <div className="card-body text-danger">
                {props.m}
            </div>
        </div>
    );
}



export default function Home() {
    const [loginOrRegister, setLoginOrRegister] = useState(false);
    const [userData, setUserData] = useState(null);

    function handleClick() {
        setError("");
        setLoginOrRegister(!loginOrRegister);
    }

    const [error, setError] = useState("");



    useEffect(()=>{
        async function getUser() {
            const res = await Axios({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:5000/user/getUser'
            });
            // console.log(res);
            return res;
        }


        async function resolve() {
            var user = await getUser();
            // console.log(user.data);

            setUserData(user.data);
        }

        resolve();
    }, []);

    if(userData && userData !== '') {
        console.log(userData);
        if(userData.access === 'user') {
            var url = '/user/' + userData.id;
            // console.log("/" + url);
            return <Navigate to={url} />;
        }
        else {
            return <Navigate to="/admin" />;
        }
    } 


    return (
        <div className="background-radial-gradient">
        
            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            
                <div className="row gx-lg-5  mb-5 ">
                    
                    <Info />
                    

                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5 text-center">
                                <div className="mb-4">
                                    <img  src={Image} alt="Manipal"></img>
                                </div>

                                {
                                    error !== "" && <ErrorCard m={error}/>
                                }

                                <div>
                                {
                                    loginOrRegister ? <Register setError={setError} redirect={setLoginOrRegister}/> : <Login setError={setError}/>
                                }
                                </div>
                                <div>
                                    <button style={{border: 0, backgroundColor: "hsla(0, 0%, 100%, 0.9) !important", backdropFilter: "saturate(200%) blur(25px)"}} onClick={handleClick}><u><p>{loginOrRegister ? "Already have an account?" : "Don't have an account?" }</p></u></button>
                                </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    );
}