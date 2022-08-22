import React, { useEffect, useState } from 'react';
import { DateField, TimeField } from './DateAndTime.component';

const cardStyle = {
    padding: "1rem 1rem 1rem 1rem",
    margin: "1em 0em 1em 0em"
};

const textCenterAlign = {
    textAlign: "center",
}
const textRightAlign = {
    textAlign: "right"
}


const Card = (props) => {
    return (
        <div className={props.deadline === 1 ?"card text-bg-warning":"card"} style={cardStyle}>
            <div className="card-title"><strong>{props.data.company}</strong></div>
            <div className="card-body">
                <div className="row">
                    <div className='col-sm-4'>{props.data.description}</div>
                    <div className='col-sm-2' style={textCenterAlign}><strong><em>Min CGPA</em></strong><br/>{props.data.mincgpa.$numberDecimal}</div>
                    <div className='col-sm-2' style={textCenterAlign}><strong><em>Deadline</em></strong><br/><DateField date={props.data.deadline} /></div>
                    <div className='col-sm-2' style={textCenterAlign}><strong><em>Time</em></strong><br/><TimeField date={props.data.deadline}/></div>
                    <div className='col-sm-2' style={textRightAlign}> <a href={props.data.link}><button className="btn btn-outline-success" >Apply</button></a></div>
                </div>
            </div>
        </div>
    );
}


function Listing(props) {
    const [deadline, setDeadline] = useState(2);

    useEffect(()=>{
        const date = new Date();
        const oneDay = new Date();
        oneDay.setDate(date.getDate() + 1);
        const deadlineDate = new Date(props.data.deadline);
        if( deadlineDate.getTime() <= date.getTime() ) {
            setDeadline(0);
        }   
        else if (deadlineDate.getTime() <= oneDay.getTime())
            setDeadline(1);// eslint-disable-next-line
    },[])

    return ((deadline !== 0) && <Card data={props.data} deadline ={deadline}/>);
}

export default Listing;