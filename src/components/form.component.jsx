import React from "react";

// All the form Components
// 1. Input 
// 2. Text Area
// 3. Checkbox


export function Input(props) {

    const handleChange = (e) => {
        props.setValue((prevValue)=>{
            return {
                ...prevValue,
                [props.name]: e.target.value
            }
        })
    }

    const marginStyle = {
        margin: "1em 0em 1em 0em"
    }
    return(
        <div className="form-group" style={marginStyle}>
            <label className="form-label">{props.label}</label>
            {
                props.type === "number" 
                ? <input type={props.type} placeholder={props.placeholder} className="form-control" value={props.value} name={props.name} onChange={handleChange} min={props.min} max={props.max} required/>
                : <input type={props.type} placeholder={props.placeholder} className="form-control" value={props.value} name={props.name} onChange={handleChange} required/>
            }  
        </div>
    );
}


export function TextArea(props) {

    function handleChange(e) {
        props.setValue(prev=>{
            return {
                ...prev,
                [props.name]: e.target.value
            }
        });
    }
    const style={
        resize: "none"
    }
    return (
        <div className="form-group">
            <label className="form-label">{props.label}</label>
            <textarea className="form-control" rows="7" placeholder={props.placeholder} onChange={handleChange} style={style} value={props.value}/>
        </div>
    );
}


export function Branch(props) {


    const Branches = ["CSE", "IT", "CCE", "ECE", "EEE", "Mech", "BIO-TECH", "Civil"];

    const handleCheckChange = (e) => {

        const isChecked = e.target.checked;
        if(isChecked) {
            props.setValue((prev)=>({
                ...prev,
                ["branch"]: [...prev.branch, e.target.value]
            }))
        }
        else {
            props.setValue((prev)=>{
                const index = prev.branch.indexOf(e.target.value);
                prev.branch.splice(index, 1);
                return prev;
            })
        }
    }

    return(
        <div className="from-group">
        <label className="form-label">Branch</label><br/>
            {
                Branches.map((b, i)=>{
                    return (
                        <div className="form-check form-check-inline" key={i}>
                            <input className="form-check-input" type="checkbox" value={b} onChange={handleCheckChange}/>
                            <label className="form-check-label" >
                                {b}
                            </label>
                        </div>
                        );
                })
            }
        </div>
    );
}
