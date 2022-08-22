import React from "react";

export default function Filter(props) {

    const Branches = ["CSE", "IT", "CCE", "ECE", "EEE", "Mech", "BIO-TECH", "Civil"];
    return (

        <div className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px col-1">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        </button>
        <ul className="dropdown-menu">
            {
                Branches.map((b, i)=>{
                   return <li key={i}><a className="dropdown-item" href="#">{b}</a></li>;
                })
            }
            
            {/* <li><a class="dropdown-item rounded-2" href="#">Another action</a></li>
            <li><a class="dropdown-item rounded-2" href="#">Something else here</a></li>
            <li><a class="dropdown-item rounded-2" href="#">Separated link</a></li> */}
        </ul>
        </div>
    );
}