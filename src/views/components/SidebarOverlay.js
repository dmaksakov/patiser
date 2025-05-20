import classnames from "classnames";
import React from "react";


class SidebarOverlay extends React.Component {

	render() {

		const {
			sidebar,
			handleSidebar,
		} = this.props

		return (
			<React.Fragment>
				<div
					className={classnames("data-list-overlay", {
						show: sidebar
					})}
					onClick={() => handleSidebar(false, '')}
				/>
			</React.Fragment>
		)
	}
}

export default SidebarOverlay
