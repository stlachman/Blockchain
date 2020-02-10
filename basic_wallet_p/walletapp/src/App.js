import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [walletID, setWalletID] = useState("Seth");
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    // axios get request to server
    fetch(`http://localhost:5000/transactions/${walletID}`)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);
        setTransactions(myJson);
      });
  };
  let amount =
    transactions.user_transactions &&
    transactions.user_transactions.reduce((acc, cv) => {
      if (cv.recipient === walletID) {
        return (acc += cv.amount);
      } else {
        return (acc -= cv.amount);
      }
    }, 0);
  return (
    <main>
      <div className="flex-center">
        <h2>Current Bitcoin: {amount}</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="id">Wallet Id</label>
            <input
              value={walletID}
              onChange={e => setWalletID(e.target.value)}
              name="id"
              type="text"
            />
            <button>Submit</button>
          </form>
        </div>
        {transactions.user_transactions &&
          transactions.user_transactions.map(transaction => {
            return (
              <div>
                <p>
                  <span style={{ color: "red" }}>{transaction.sender}</span>{" "}
                  sent {transaction.amount} bitcoins to{" "}
                  <span style={{ color: "green" }}>
                    {transaction.recipient}
                  </span>
                </p>
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default App;
