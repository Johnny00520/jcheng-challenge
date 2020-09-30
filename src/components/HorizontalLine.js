import React from 'react'

const HorizontalLine = ({ color }) => {
    return (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 3
            }}
        />
    )
}

export default HorizontalLine
