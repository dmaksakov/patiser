import React, {PureComponent} from "react"
import classnames from "classnames"
import Customizer from "../components/@vuexy/customizer/Customizer"
import Sidebar from "./components/menu/vertical-menu/Sidebar"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import {connect} from "react-redux"
import {
	changeMode,
	collapseSidebar,
	changeNavbarColor,
	changeNavbarType,
	changeFooterType,
	changeMenuColor,
	hideScrollToTop
} from "../redux/customizer/actions"

class VerticalLayout extends PureComponent {
	state = {
		width: window.innerWidth,
		sidebarState: this.props.app.sidebarCollapsed,
		layout: this.props.app.theme,
		collapsedContent: this.props.app.sidebarCollapsed,
		sidebarHidden: false,
		currentLang: "en",
		appOverlay: false,
		customizer: false,
		isTouropen: false,
		currRoute: this.props.location.pathname
	}
	collapsedPaths = []
	updateWidth = () => {
		this.setState(prevState => ({
			width: window.innerWidth
		}))
	}

	handleCustomizer = bool => {
		this.setState({
			customizer: bool
		})
	}

	componentDidMount() {
		let {
			location: {pathname},
			app: {
				theme, direction
			}
		} = this.props

		if (window !== "undefined") {
			window.addEventListener("resize", this.updateWidth, false)
		}
		if (this.collapsedPaths.includes(pathname)) {
			this.setState({
				sidebarState: true,
				collapsedContent: true
			})
		}

		let layout = theme
		let dir = direction
		if (dir === "rtl")
			document.getElementsByTagName("html")[0].setAttribute("dir", "rtl")
		else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
		return layout === "dark"
			? document.body.classList.add("dark-layout")
			: layout === "semi-dark"
				? document.body.classList.add("semi-dark-layout")
				: null
	}


	componentDidUpdate(prevProps, prevState) {
		let {
			location: {pathname},
			app: {
				theme, sidebarCollapsed
			}
		} = this.props

		let layout = theme
		if (layout === "dark") {
			document.body.classList.remove("semi-dark-layout")
			document.body.classList.add("dark-layout")
		}
		if (layout === "semi-dark") {
			document.body.classList.remove("dark-layout")
			document.body.classList.add("semi-dark-layout")
		}
		if (layout !== "dark" && layout !== "semi-dark") {
			document.body.classList.remove("dark-layout", "semi-dark-layout")
		}

		if (
			prevProps.app.sidebarCollapsed !==
			this.props.app.sidebarCollapsed
		) {
			this.setState({
				collapsedContent: sidebarCollapsed,
				sidebarState: sidebarCollapsed
			})
		} else if (
			prevProps.location.pathname !== this.props.location.pathname &&
			prevProps.app.sidebarCollapsed ===
			this.props.app.sidebarCollapsed
		) {
			this.setState({
				collapsedContent: sidebarCollapsed,
				sidebarState: sidebarCollapsed
			})
		} else if (
			prevProps.location.pathname === this.props.location.pathname &&
			prevProps.app.sidebarCollapsed ===
			this.props.app.sidebarCollapsed
		) {
			return
		}

		if (this.collapsedPaths.includes(pathname)) {
			this.handleRouteChange()
		}
	}

	handleRouteChange = () => {
		if (this.collapsedPaths.includes(this.props.location.pathname)) {
			this.setState({
				sidebarState: true,
				collapsedContent: true
			})
		} else {
			this.setState({
				sidebarState: false,
				collapsedContent: false
			})
		}
	}

	handleCollapsedMenuPaths = item => {
		let collapsedPaths = this.collapsedPaths
		if (!collapsedPaths.includes(item)) {
			collapsedPaths.push(item)
			this.collapsedPaths = collapsedPaths
		}
	}

	toggleSidebarMenu = (val) => {
		this.setState({
			sidebarState: !this.state.sidebarState,
			collapsedContent: !this.state.collapsedContent
		})
	}

	sidebarMenuHover = val => {
		this.setState({
			sidebarState: val
		})
	}

	handleSidebarVisibility = () => {
		window.addEventListener("resize", () => {
			if (this.state.sidebarHidden) {
				this.setState({
					sidebarHidden: !this.state.sidebarHidden
				})
			}
		})
		this.setState({
			sidebarHidden: !this.state.sidebarHidden
		})
	}

	handleCurrentLanguage = lang => {
		this.setState({
			currentLang: lang
		})
	}

	handleAppOverlay = value => {
		if (value.length > 0) {
			this.setState({
				appOverlay: true
			})
		} else if (value.length < 0 || value === "") {
			this.setState({
				appOverlay: false
			})
		}
	}

	handleAppOverlayClick = () => {
		this.setState({
			appOverlay: false
		})
	}

	render() {
		let appProps = this.props.app
		let menuThemeArr = ["primary", "success", "danger", "info", "warning", "dark"]
		let sidebarProps = {
			toggleSidebarMenu: this.props.collapseSidebar,
			toggle: this.toggleSidebarMenu,
			sidebarState: this.state.sidebarState,
			sidebarHover: this.sidebarMenuHover,
			sidebarVisibility: this.handleSidebarVisibility,
			visibilityState: this.state.sidebarHidden,
			activePath: this.props.match.path,
			collapsedMenuPaths: this.handleCollapsedMenuPaths,
			currentLang: this.state.currentLang,
			activeTheme: appProps.menuTheme,
			collapsed: this.state.collapsedContent,
			permission: this.props.permission,
			deviceWidth: this.state.width
		}
		let navbarProps = {
			toggleSidebarMenu: this.toggleSidebarMenu,
			sidebarState: this.state.sidebarState,
			sidebarVisibility: this.handleSidebarVisibility,
			currentLang: this.state.currentLang,
			changeCurrentLang: this.handleCurrentLanguage,
			handleAppOverlay: this.handleAppOverlay,
			appOverlayState: this.state.appOverlay,
			navbarColor: appProps.navbarColor,
			navbarType: appProps.navbarType
		}

		let footerProps = {
			footerType: appProps.footerType,
			hideScrollToTop: appProps.hideScrollToTop
		}

		let customizerProps = {
			customizerState: this.state.customizer,
			handleCustomizer: this.handleCustomizer,
			changeMode: this.props.changeMode,
			changeNavbar: this.props.changeNavbarColor,
			changeNavbarType: this.props.changeNavbarType,
			changeFooterType: this.props.changeFooterType,
			changeMenuTheme: this.props.changeMenuColor,
			collapseSidebar: this.props.collapseSidebar,
			hideScrollToTop: this.props.hideScrollToTop,
			activeMode: appProps.theme,
			activeNavbar: appProps.navbarColor,
			navbarType: appProps.navbarType,
			footerType: appProps.footerType,
			menuTheme: appProps.menuTheme,
			scrollToTop: appProps.hideScrollToTop,
			sidebarState: appProps.sidebarCollapsed
		}
		return (
			<div
				className={classnames(`wrapper vertical-layout theme-${appProps.menuTheme}`, {
					"menu-collapsed":
						this.state.collapsedContent === true && this.state.width >= 1200,
					"fixed-footer": appProps.footerType === "sticky",
					"navbar-static": appProps.navbarType === "static",
					"navbar-sticky": appProps.navbarType === "sticky",
					"navbar-floating": appProps.navbarType === "floating",
					"navbar-hidden": appProps.navbarType === "hidden",
					"theme-primary": !menuThemeArr.includes(appProps.menuTheme)
				})}
			>
				<Sidebar {...sidebarProps} />
				<div
					className={classnames("app-content content", {
						"show-overlay": this.state.appOverlay === true
					})}
					onClick={this.handleAppOverlayClick}
				>
					<Navbar {...navbarProps} />
					<div className="content-wrapper">{this.props.children}</div>
				</div>

				<Footer {...footerProps} />
				{appProps.disableCustomizer !== true ? (
					<Customizer {...customizerProps} />
				) : null}
				<div
					className="sidenav-overlay"
					onClick={this.handleSidebarVisibility}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		app: state.customizer
	}
}
export default connect(mapStateToProps, {
	changeMode,
	collapseSidebar,
	changeNavbarColor,
	changeNavbarType,
	changeFooterType,
	changeMenuColor,
	hideScrollToTop
})(VerticalLayout)
