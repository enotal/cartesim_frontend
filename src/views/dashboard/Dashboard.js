import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { isAuthenticated } from '../../authService'

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  return (
    <div className="container mt-4">
      Dashboard
      <div className="row mt-4 row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* <!-- Card 1 --> */}
        <div className="col">
          <div className="card h-100">
            {/* <img src="..." className="card-img-top img-fluid" alt="Card image cap"/> */}
            <div className="card-body">
              <h5 className="card-title">Card title 1</h5>
              <p className="card-text">This card has some text content, and is responsive.</p>
            </div>
          </div>
        </div>

        {/* <!-- Card 2 --> */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Card title 2</h5>
              <p className="card-text">This card has short content.</p>
            </div>
          </div>
        </div>

        {/* <!-- Card 3 --> */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Card title 3</h5>
              <p className="card-text">This is a longer card with more text below.</p>
            </div>
          </div>
        </div>

        {/* <!-- Card 4 --> */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Card title 4</h5>
              <p className="card-text">This card has short content.</p>
            </div>
          </div>
        </div>

        {/* <!-- Card 5 --> */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Card title 5</h5>
              <p className="card-text">This is a longer card with more text below.</p>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  )
}

export default Dashboard
