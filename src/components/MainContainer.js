import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

const API = "http://localhost:3001/stocks"

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filterBy, setFilterBy] = useState("Tech")

  useEffect(() => {
    fetch(API)
    .then(r=>r.json())
    .then(setStocks)
  }, [])

  function handleAddStock(stockToAdd) {
    const stockInPortfolio = portfolio
      .find(stock => stock.id === stockToAdd.id)
    if (!stockInPortfolio){
      setPortfolio([...portfolio, stockToAdd])
    }
  }

  function handleRmoveStock(stockToRemove) {
    setPortfolio((portfolio) =>
      portfolio.filter(stock => stock.id !== stockToRemove.id)
    )
  }

  const sortStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  })

  const filterStocks = sortStocks.filter((stock) => 
    stock.type === filterBy)

  return (
    <div>
      <SearchBar filterBy={filterBy} onChangeFilter={setFilterBy} sortBy={sortBy} onChangeSort={setSortBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filterStocks} onAddStock={handleAddStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onRemoveStock={handleRmoveStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
