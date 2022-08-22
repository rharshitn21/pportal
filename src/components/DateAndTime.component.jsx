import React from "react";

export const DateField = (props) => {
    const date = new Date(props.date);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return(
        <p>{day}-{month+1}-{year}</p>
    );
}

export const TimeField = (props)=> {
    const date = new Date(props.date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (
        <p>{hours}:{ (minutes<10?("0"):"") + minutes}</p>
    );
}