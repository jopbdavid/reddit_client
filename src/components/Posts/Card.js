import React from "react";
import "./card.css"


export const Card =(props) => {
    return (
        <div className={`card ${props.className}`}>
            {props.children}
        </div>
    );
};