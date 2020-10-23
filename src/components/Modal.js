
import React from 'react';
import Backdrop from "./Backdrop";

const modal = props => {
    return (
		<>
			<Backdrop show={props.show} onTableRowHandler={props.onTableRowHandler}/>
			<div
				className="modal_wrapper"
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? 1 : 0
				}}
			>
				{props.children}
			</div>
		</>
    );
};


export default modal;