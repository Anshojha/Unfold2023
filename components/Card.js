import React, { useState } from "react";

const Card = ({ name, description, email, amount, wallet_address, clickHandler }) => {
  const [amt, setAmt] = useState(0)
  return (
    <div className="card">
      <div className="card-head">
        <h2 className="card-h">{name}</h2>
        <div>
          <input
            className="input-card"
            type="number"
            placeholder="Enter the amount"
            onChange={(e) => setAmt(e.target.value)}
          />
        </div>
        <button onClick={() =>  clickHandler(wallet_address, amt) } className="bttn3">DONATE</button>
      </div>
      <div className="descrip">
        {description}
        <div className="min-amt">
          Raising: <strong className="am">{amount}</strong> MATIC
        </div>
      </div>
    </div> 
  );
};

export default Card;
