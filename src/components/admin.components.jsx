import React, { useEffect, useState } from "react";
import Listing from "./listings.components.jsx";
import Header from "./Header.component.jsx";
import Footer from "./footer.component.jsx";
// import Filter from "./filter.component.jsx";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Logout from "./logout.component.jsx";


export default function Admin() {

    const [listings, setListings] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

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


        async function getListings() {
            const data = await Axios({
                url: 'http://localhost:5000/listings?branch=all',
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
            
            setUserData(user.data);
            if(user.data !== '' && user.data.access === 'admin')
                getListings();
            else
                navigate("/");
        }
        
        if(!userData) {
            resolve();
        }
        else {
            if(userData.access === 'admin')
                getListings();
            else
                navigate("/");
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps



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

}