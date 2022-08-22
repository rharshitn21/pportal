import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';





export default function Logout(props) {
    const navigate = useNavigate();
    async function LogoutClicked() {
        // 
        const res = await Axios({
            method: 'POST',
            withCredentials: true,
            url: 'http://localhost:5000/user/logout'
        });
        console.log(res);
        navigate("/");
    }

    // console.log(props);
    return (
        <div class="px-3 py-2 border-bottom mb-3"> 
        <div className="container d-flex flex-wrap  justify-content-center">
            <div className='text-end'>
                { props.userdata && (props.userdata.access === 'admin' && <button type="button" onClick={()=>navigate("/admin/add")} className="btn btn-outline-primary">Add Posting</button>) } 
                <button onClick={LogoutClicked} type="button" className="btn btn-outline-secondary text-dark me-2" style={{margin: "0em 0em 0em 1em"}}>Logout</button>
            </div>
        </div>
        </div>
    );
}