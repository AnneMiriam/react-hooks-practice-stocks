import React from "react";

function Stock({stock, onStockClick}) {
  const {ticker, name, price} = stock
  
  function handlClick() {
    onStockClick(stock)
  }

  return (
    <div onClick={handlClick}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{ticker}:{price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
