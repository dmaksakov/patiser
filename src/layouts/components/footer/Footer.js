import React from "react"
import ScrollToTop from "react-scroll-up"
import {Button, Row, Col} from "reactstrap"
import {Heart, ArrowUp} from "react-feather"
import classnames from "classnames"

const Footer = props => {
	let footerTypeArr = ["sticky", "static", "hidden"]
	return (
		<footer
			className={classnames("footer footer-light", {
				"footer-static": props.footerType === "static" || !footerTypeArr.includes(props.footerType),
				"d-none": props.footerType === "hidden"
			})}
		>
				<Row className="no-gutters">
					<Col xs={12} lg={4} className="text-align-center">
						COPYRIGHT © {new Date().getFullYear()}
						<a
							href="https://patiser.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							Patiser,
						</a>
						All rights reserved
					</Col>
					<Col xs={12} lg={4} className="text-align-center">
						<a
							href="https://patiser.com/terms-of-use"
							target="_blank"
							rel="noopener noreferrer"
						>
							Terms of Use
						</a> and <a
							href="https://patiser.com/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
						>
							Privacy Policy
						</a>
						{/*<span>As an Amazon Associate we earn from qualifying purchases.</span>*/}
					</Col>
					<Col xs={12} lg={4} className="text-align-center">
						As an Amazon Associate we earn from qualifying purchases.
						{/*<span className="align-middle">Hand-crafted & Baked with</span>{" "}*/}
						{/*<Heart className="text-danger" size={15}/>*/}
					</Col>
				</Row>
			{props.hideScrollToTop === false ? (
				<ScrollToTop showUnder={160}>
					<Button color="primary" className="btn-icon scroll-top">
						<ArrowUp size={15}/>
					</Button>
				</ScrollToTop>
			) : null}
		</footer>
	)
}

export default Footer
