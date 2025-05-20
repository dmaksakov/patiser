import React from "react"
import {
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	Media,
	Badge
} from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
import axios from "axios"
import * as Icon from "react-feather"
import classnames from "classnames"
import Autocomplete from "../../../components/@vuexy/autoComplete/AutoCompleteComponent"
import {clearToken} from "../../../helpers/utility"
import {Link, useHistory} from "react-router-dom";

const logout = (history) => {
	clearToken()
	history.push("/login")
}

const UserDropdown = () => {

	let history = useHistory();
	return (
		<DropdownMenu right>
			<DropdownItem
				tag="a"
				onClick={(e) => history.push("/account/profile")}
			>
				<Icon.User size={14} className="mr-50"/>
				<span className="align-middle">My Profile</span>
			</DropdownItem>

			<DropdownItem divider/>

			<DropdownItem
				tag="a"
				href="#"
				onClick={()=>logout(history)}
			>
				<Icon.Power size={14} className="mr-50"/>
				<span className="align-middle">Log Out</span>
			</DropdownItem>
		</DropdownMenu>
	)
}

class NavbarUser extends React.PureComponent {
	state = {
		navbarSearch: false,
		suggestions: []
	}

	componentDidMount() {
		axios.get("/api/main-search/data").then(({data}) => {
			this.setState({suggestions: data.searchResult})
		})
	}


	render() {
		return (
			<ul className="nav navbar-nav navbar-nav-user float-right">

				<UncontrolledDropdown tag="li" className="dropdown-user nav-item">
					<DropdownToggle tag="a" className="nav-link dropdown-user-link">
						<div className="user-nav d-sm-flex d-none">
							<span className="user-name text-bold-600">
								{this.props.userName}
							</span>
							<span className="user-status">Available</span>
						</div>
						<span data-tour="user">
							<img
							  src={this.props.userImg}
							  className="round user-profile"
							  height="40"
							  width="40"
							  alt="avatar"
							/>
						</span>
					</DropdownToggle>
					<UserDropdown {...this.props} />
				</UncontrolledDropdown>
			</ul>
		)
	}
}

export default NavbarUser
