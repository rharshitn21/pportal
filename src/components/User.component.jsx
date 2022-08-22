import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import Listing from "./listings.components.jsx";
import Header from "./Header.component.jsx";
import Footer from "./footer.component.jsx";
// import Filter from "./filter.component.jsx";
import Logout from "./logout.component.jsx";



export default function User() {

    const [userData, setUserData] = useState(null);
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // getUser from server

        async function getUser() {
            const res = await Axios({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:5000/user/getUser'
            });
            // console.log(res);
            return res;
        }


        async function getListings() {
            const data = await Axios({
                url: 'http://localhost:5000/listings',
                method: 'GET',
                withCredentials: true
            });
            const listingsData = await data.data;
            // console.log(listingsData);
            setListings(listingsData);
            
        }


        async function resolve() {
            var user = await getUser();
            // console.log(user.data);
            // console.log(user.data);
            setUserData(user.data);
            if(user.data === '') navigate("/");
            getListings();
        }
        
        if(!userData) {
            resolve();
        }
        else {
            getListings();
        }
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps
        

    // function PageBody() {
        return (
            <div className="container">
                <Header />
                <Logout userdata = {userData}/>
                <div >
                    {listings.map((listing)=>(<Listing key={listing._id} data={listing} />))}
                </div>
                <Footer />
            </div>
        );
    // }


    
}