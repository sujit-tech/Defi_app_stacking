// deposit and withdraw missing tryed to add differently...
import React, { Component } from "react";
import tether from "../tether.png";
import AirDrop from "./AirDrop";
import Web3 from 'web3';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputValue: '',depositedAmount: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeposit = this.handleDeposit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
}

handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
}

async handleDeposit() {
    const inputValue = this.state.inputValue.trim();
    if (!inputValue) {
        alert("Please enter a valid amount.");
        return;
    }
    
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const amountToSend = web3.utils.toWei(inputValue, "ether");
            const transaction = await web3.eth.sendTransaction({
                from: accounts[0],
                to: '0xb89073EB727B1223e28920025842dD1F1DaA7A0E', // Replace with the contract address
                value: amountToSend,
                gas: 200000
            });
            console.log("Transaction hash:", transaction.transactionHash);
            // Handle transaction success
        } catch (error) {
            // Handle error
            console.error("Transaction error:", error);
        }
    } else {
        alert("Please install MetaMask to use this feature.");
    }
}


  render() {
    return (
      <div id="content" className="mt-3">
          <table className="table text-muted text-center">
            <thead>
              <tr style={{ color: "burlywood" }}>
                <th scope="col">stacking Balance</th>
                <th scope="col">RWD Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ color: "burlywood" }}>
                <td>
                  {window.web3.utils.fromWei(
                    this.props.stackingBalance,
                    "ether"
                  )}
                  mUSDT
                </td>
                <td>
                  {window.web3.utils.fromWei(this.props.rwdBalance, "ether")}{" "}
                  RWD
                </td>
              </tr>
            </tbody>
          </table>

          <div className="card mb-2" style={{ opacity: ".9" }}>
            <form className="mb-3">
              <div style={{ borderSpacing: "0 lem" }}>
                <label
                  className="float-left"
                  style={{ color: "burlywood", marginLeft: "15px" }}
                >
                  <b>stacking Tokens</b>
                </label>
                <span
                  className="float-right"
                  style={{ color: "burlywood", marginRight: "8px" }}
                >
                  Balance:
                  {window.web3.utils.fromWei(this.props.tetherBalance, "ether")}
                </span>
                <div className="input-group mb-4">
                  <input type="text" placeholder="0" required   value={this.state.inputValue}
                        onChange={this.handleInputChange} />
                  <div className="input-group-open">
                    <div className="input-group-text">
                      <img src={tether} alt="tether" height="32" />
                      &nbsp; mUSDT
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-large btn-block" onClick={this.handleDeposit}
                >
                  DEPOSIT
                </button>
              </div>
            </form>
            <button className="btn btn-primary btn-large btn-block" onClick={this.handleWithdraw}>
              WITHDRAW
            </button>
            <div className="card-body text-center" style={{ color: "blue" }}>
              {" "}
              <b>AirDrop </b> <AirDrop stackingBalance={this.props.stackingBalance}/>
            </div>
          </div>
      </div>
    );
  }
}

export default Main;
