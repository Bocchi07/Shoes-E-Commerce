import React from 'react'
import "./spinning.css"

function SpinningSquares() {
	return (
		<div className="spinner-box">
		  <div className="configure-border-1">
		    <div className="configure-core"></div>
		  </div>
		  <div className="configure-border-2">
		    <div className="configure-core"></div>
		  </div>
		</div>
	)
}

export default SpinningSquares;