import React from "react";
import {Button, Popover, PopoverBody, PopoverHeader} from "reactstrap";

//TODO - make use of including the child component
class PopConfirm extends React.Component {

	state = {
		popoverOpen: false,
	}

	togglePopover = () => {
		this.setState({
			popoverOpen: !this.state.popoverOpen
		})
	}

	render() {

		const {
			targetId,
			deleteAction,
		} = this.props

		return targetId ? (
			<Popover
				placement='top'
				target={targetId}
				isOpen={this.state.popoverOpen}
			>
				<PopoverHeader className={'pop-confirm-header'} color={'success'}>Are you sure?</PopoverHeader>
				<PopoverBody>
					<Button
						className={'mr-1'}
						size={'sm'}
						color={'warning'}
						onClick={(e) => {
							e.stopPropagation()
							this.togglePopover()
						}}
					>
						no
					</Button>
					<Button
						size={'sm'}
						color={'danger'}
						onClick={(e) => {
							e.stopPropagation()
							deleteAction()
							this.togglePopover()
						}}
					>
						yes
					</Button>
				</PopoverBody>
			</Popover>
		) : <span />
	}
}

export default PopConfirm
