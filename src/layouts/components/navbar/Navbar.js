import React from "react"
import {Navbar, Alert} from "reactstrap"
import classnames from "classnames"
import NavbarBookmarks from "./NavbarBookmarks"
import NavbarUser from "./NavbarUser"
import accountActions from "../../../redux/account/actions"
import {connect} from "react-redux"
import userImg from "../../../assets/img/portrait/small/blank-profile-picture.png"


const {
	getProfileRequest,
} = accountActions

class ThemeNavbar extends React.Component{

	componentDidMount() {
		if (!this.props.profile.first_name) {
			this.props.getProfileRequest()
		}
	}

	render() {

		const colorsArr = ["primary", "danger", "success", "info", "warning", "dark"]
		const navbarTypes = ["floating", "static", "sticky", "hidden"]
		const { profile, navbarColor, navbarType, horizontal, scrolling, sidebarVisibility, handleAppOverlay, changeCurrentLang } = this.props

		return (
			<React.Fragment>
				<div className="content-overlay"/>
				<div className="header-navbar-shadow"/>

				<Navbar
					className={classnames(
						"header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
						{
							"navbar-light": navbarColor === "default" || !colorsArr.includes(navbarColor),
							"navbar-dark": colorsArr.includes(navbarColor),
							"bg-primary":
								navbarColor === "primary" && navbarType !== "static",
							"bg-danger":
								navbarColor === "danger" && navbarType !== "static",
							"bg-success":
								navbarColor === "success" && navbarType !== "static",
							"bg-info":
								navbarColor === "info" && navbarType !== "static",
							"bg-warning":
								navbarColor === "warning" && navbarType !== "static",
							"bg-dark":
								navbarColor === "dark" && navbarType !== "static",
							"d-none": navbarType === "hidden" && !horizontal,
							"floating-nav":
								(navbarType === "floating" && !horizontal) || (!navbarTypes.includes(navbarType) && !horizontal),
							"navbar-static-top":
								navbarType === "static" && !horizontal,
							"fixed-top": navbarType === "sticky" || horizontal,
							"scrolling": horizontal && scrolling

						}
					)}
				>
					<div className="navbar-wrapper">
						<div className="navbar-container content">
							<div
								className="navbar-collapse d-flex justify-content-between align-items-center"
								id="navbar-mobile"
							>
								<div className="bookmark-wrapper">
									<NavbarBookmarks
										sidebarVisibility={sidebarVisibility}
										handleAppOverlay={handleAppOverlay}
									/>
								</div>
								{profile.active === false
									?
									<Alert color={'warning'} className={'mt-1 d-none d-sm-flex'}>
										Please activate your profile. To activate your profile please find an email from us and click the activation link.
									</Alert>
									:
									<h5 className="d-sm-flex d-none">{profile.company.name}</h5>
								}
								{horizontal ? (
									<div className="logo d-flex align-items-center">
										<div className="brand-logo mr-50" />
										<h2 className="text-primary brand-text mb-0">Patiser</h2>
									</div>
								) : null}
								<NavbarUser
									handleAppOverlay={handleAppOverlay}
									changeCurrentLang={changeCurrentLang}
									userName={profile.first_name ? profile.first_name + ' ' + profile.last_name : ''}
									userImg={profile.profile_picture ? profile.profile_picture : userImg}
								/>
							</div>
						</div>
					</div>
				</Navbar>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		profile: state.account.toJS().profile,
	}
}

export default connect(mapStateToProps, {
	getProfileRequest,
})(ThemeNavbar)
