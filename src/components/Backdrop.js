import React from 'react';

const Backdrop = (props) => (
    props.show ? <div className="backdrop" onClick={props.onTableRowHandler}></div> : null
)

export default Backdrop
