import React from "react"
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink
} from "reactstrap"
import classnames from "classnames"
import {Eye, Code, GitHub} from "react-feather"
import Avatar from "./AvatarComponent"
import {avatarDefault} from "./AvatarSourceCode"
import avatarImg from "../../../assets/img/portrait/small/avatar-s-20.jpg"

class AvatarDefault extends React.Component {
	state = {
		activeTab: "1"
	}

	toggleTab = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({activeTab: tab})
		}
	}

	render() {
		return (
			<React.Fragment>
				<Card>
					<CardHeader>
						<CardTitle>Default</CardTitle>
						<div className="views">
							<Nav tabs>
								<NavItem>
									<NavLink
										className={classnames({
											active: this.state.activeTab === "1"
										})}
										onClick={() => {
											this.toggleTab("1")
										}}
									>
										<Eye size={15}/>
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({
											active: this.state.activeTab === "2"
										})}
										onClick={() => {
											this.toggleTab("2")
										}}
									>
										<Code size={15}/>
									</NavLink>
								</NavItem>
							</Nav>
						</div>
					</CardHeader>
					<CardBody>
						<p>
							Use Vuexy's Avatar component and pass <code>icon</code> or{" "}
							<code>content</code> or <code>img</code> to create an avatar.
						</p>
						<TabContent activeTab={this.state.activeTab}>
							<TabPane tabId="1">
								<Avatar className="mr-1" icon={<GitHub/>}/>
								<Avatar className="mr-1" content="LD"/>
								<Avatar className="mr-1" content="Luisd"/>
								<Avatar img={avatarImg}/>
							</TabPane>
							<TabPane className="component-code" tabId="2">
								{avatarDefault}
							</TabPane>
						</TabContent>
					</CardBody>
				</Card>
			</React.Fragment>
		)
	}
}

export default AvatarDefault
