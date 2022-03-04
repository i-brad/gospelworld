import React from 'react'

function Loader({id = ""}) {
    return (
			<div className="loader" id={id}>
				<div style={{ "--i": 5 }}></div>
				<div style={{ "--i": 3 }}></div>
				<div style={{ "--i": 1 }}></div>
				<div style={{ "--i": 3 }}></div>
				<div style={{ "--i": 5 }}></div>
			</div>
		);
}

export default Loader
