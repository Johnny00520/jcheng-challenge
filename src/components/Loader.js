
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import React from "react";

const override = css`
	margin: 0 auto;
	padding-top: 50px;
	background-color: "lightgrey";
`;

const Loader = ({ loading }) => {
	return (
		<div className="loading_wrapper">

			<CircleLoader
				css={override}
				size={150}
				color={"#123abc"}
				loading={loading}
			/>
			<p>
				Loading...
			</p>
		</div>
	)
}
export default Loader;