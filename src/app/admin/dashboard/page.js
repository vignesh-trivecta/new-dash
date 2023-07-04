'use client';
import React from "react";

const DashCards = () => {
    return(
        <div className="row row-cols-3 g-4">
            <div className="col">
                <div className={` card p-3`}>
                    <h6 className="card-title">Total number of transactions <img src="https://www.svgrepo.com/show/379273/transaction.svg" width='20' /></h6>
                    <p className='card-text'>115</p>
                </div>
            </div>
            <div className="col">
                <div className={` card p-3`}>
                    <h6 className="card-title">Total number of orders executed <img src="https://www.svgrepo.com/show/493952/order-completed.svg" width='20' /></h6>
                    <p className='card-text'>34</p>
                </div>
            </div>
            <div className="col">
                <div className={` card p-3`}>
                    <h6 className="card-title">Total value of orders <img src="https://www.svgrepo.com/show/453520/wallet.svg" width='20' /></h6>
                    <p className='card-text'>5,00,000</p>
                </div>
            </div>
        </div>
    )
}

export default DashCards;