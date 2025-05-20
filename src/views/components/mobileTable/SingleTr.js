import React from "react";
import {Edit, Trash} from "react-feather";
import PopConfirm from "../PopConfirm";

class SingleTr extends React.Component {

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	deleteItem = () => {
		this.props.deleteAction({sid: this.props.unit.sid})
	}

	render() {

		const { columns, unit, handleSidebar, selectAction } = this.props

		return (
			<React.Fragment>
				<tr
					onClick={() => {
						this.props.gotoAction && this.props.gotoAction(unit.sid)
					}}
					key={unit.sid}
				>
					{unit.tableData.map((item, i) => {
						return i === 0
							?
							<th key={i} scope="row">
								{item}
							</th>
							:
							<td data-th={columns[i]} key={i}>
								<div>
									{item}
								</div>
							</td>
					})}
					<td>
						<Edit
							className="cursor-pointer mr-1"
							size={20}
							onClick={ (e) => {
								e.stopPropagation()
								selectAction({...unit})
								handleSidebar(true, 'edit')
							}}
						/>
						<Trash
							id={unit.sid}
							className="cursor-pointer mr-1"
							size={20}
							onClick={(e) => {
								e.stopPropagation()
								this.triggerPopover()
							}}
						/>
						<PopConfirm
							ref={popconfirm => this.popconfirm = popconfirm}
							targetId={unit.sid}
							deleteAction={this.deleteItem}
						/>
					</td>
				</tr>
			</React.Fragment>
		)

	}
}

export default SingleTr
