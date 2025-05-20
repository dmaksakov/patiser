import React from "react"
import {
	Breadcrumb,
	BreadcrumbItem,
	UncontrolledButtonDropdown,
	DropdownMenu,
	DropdownItem,
	DropdownToggle
} from "reactstrap"
import {Home, Settings} from "react-feather"
import {NavLink} from "react-router-dom"

class BreadCrumbs extends React.Component {

	render() {
		const {
			breadCrumbTitle,
			parentLink,
			parentLink2,
			parentLink3,
			breadCrumbParent,
			breadCrumbParent2,
			breadCrumbParent3,
			breadCrumbActive
		} = this.props
		return (
			<div className="content-header row">
				<div className="content-header-left col-md-9 col-12 mb-2">
					<div className="row breadcrumbs-top">
						<div className="col-12">
							{breadCrumbTitle ? (
								<h2 className="content-header-title float-left mb-0">
									{breadCrumbTitle}
								</h2>
							) : (
								""
							)}
							<div className="breadcrumb-wrapper vx-breadcrumbs d-sm-block d-none col-12">
								<Breadcrumb tag="ol">

									<BreadcrumbItem tag="li">
										<NavLink to="/">
											<Home className="align-top" size={15}/>
										</NavLink>
									</BreadcrumbItem>

									{breadCrumbParent && <BreadcrumbItem tag="li" className="text-primary">
										{parentLink
											?
											<NavLink to={parentLink}>
												{breadCrumbParent}
											</NavLink>
											:
											<span>{breadCrumbParent}</span>
										}
									</BreadcrumbItem>}

									{breadCrumbParent2 ? (
										<BreadcrumbItem tag="li" className="text-primary">
											<NavLink to={parentLink2}>
												{breadCrumbParent2}
											</NavLink>
										</BreadcrumbItem>
									) : (
										""
									)}
									{breadCrumbParent3 ? (
										<BreadcrumbItem tag="li" className="text-primary">
											<NavLink to={parentLink3}>
												{breadCrumbParent3}
											</NavLink>
										</BreadcrumbItem>
									) : (
										""
									)}
									<BreadcrumbItem tag="li" active>
										{breadCrumbActive}
									</BreadcrumbItem>
								</Breadcrumb>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default BreadCrumbs
