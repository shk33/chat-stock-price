import React, {useState, useEffect } from 'react';
import './InfoBar.css';


const InfoBar = ({room}) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/">Back to Join Page</a>
        </div>
    </div>
)

export default InfoBar;