import React, { useState, useEffect } from "react";
import {Input, TextArea, Branch} from "./form.component.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header.component.jsx";
import Footer from "./footer.component.jsx";
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function NewListingForm() {

    const [formInputs, setFormInputs] = useState({
        company: "",
        branch: [],
        description: "",
        link: "",
        mincgpa: "",
        offertype: "",
        deadline: new Date()
    });

    const handleSubmit = (e) => {
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formInputs)
        };

        fetch('https://pportal-server.herokuapp.com/listings/add', requestOptions)
            .then(response => {
                if(response.status === 200)
                    alert('Job Posted Successfully!!')
                else
                    alert('Job Posting Failed :(');
            });
    }

    const handleDateChange = (e) =>{
        console.log(e);
        setFormInputs((prev)=>{
            return {
                ...prev,
                "deadline": e
            }
        });
    }


    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{

        
        async function getUser() {
            const res = await Axios({
                method: 'GET',
                withCredentials: true,
                url: 'https://pportal-server.herokuapp.com/user/getUser'
            });
            // console.log(res);
            return res;
        }

        async function resolve() {
            var user = await getUser();
            // console.log(user.data);
            
            setUserData(user.data);
            if(user.data && user.data.access !== 'admin') navigate("/");
        }
        
        if(!userData) {
            resolve();
        }// eslint-disable-next-line
    }, []);
    
        return (
            <div className="container">
                <Header />
                <a href="/admin">home</a>
                <form onSubmit={handleSubmit}>
                    <Input label="Company" name="company" placeholder="Company Name" value={formInputs.company} setValue={setFormInputs} type="text"/>
                    <Branch setValue={setFormInputs}/>
                    <TextArea label="Description" name="description" placeholder="Company Description ..." value={formInputs.description} setValue={setFormInputs}/>
                    <Input type="url" label="Link" name="link" placeholder="link" value={formInputs.link} setValue={setFormInputs}/>
                    <Input type="number" label="Min CGPA" name="mincgpa" placeholder="Min CGPA" value={formInputs.mincgpa} setValue={setFormInputs} min="0.00" max="10.00"/>
                    <Input label="Offer Type" name="offertype" placeholder="Offer Type" value={formInputs.offertype} setValue={setFormInputs}/>
                    <div className="form-group" style={{margin: "1em 0em 1em 0em"}}>
                        <label className="form-label">Dead Line</label>
                        <DatePicker 
                        name="deadline" 
                        className="form-control" 
                        placeholderText="Pick a Date"
                        selected={formInputs.deadline}
                        showTimeSelect
                        onChange={handleDateChange}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </div>
                    <div className="form-group" style={{margin: "1em 0em 1em 0em"}}>
                        <button className="form-control btn btn-primary btn-block" type="submit">Add posting</button>
                    </div>
                </form>
            <Footer />
            </div>
            
        );

    
}