import React from "react";
import "./CharCard.css";

const CharCard = ({ id, name, image, handlePicked }) => (
    <div>
        <div
            className="card"
            key={id}
            data-id={id}
            name={name}
            style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center' }}
            onClick={handlePicked}
        >
        </div>
    </div>
)

export default CharCard;
