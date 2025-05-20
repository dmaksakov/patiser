import React from "react"
import {Card, CardBody, Button, Row, Col} from "reactstrap"
import underMaintenance from "../../assets/img/pages/maintenance-2.png"

class EmailSent extends React.Component {

	onHomeClick = () =>{
		this.props.history.push("/login");
	}

	render() {
		return (
			<Row className="m-0">
				<Col sm="12">
					<Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
						<CardBody className="text-center">
							<img
								src={underMaintenance}
								alt="underMaintenance"
								className="img-fluid align-self-center mt-75"
							/>
							<h1 className="font-large-2 my-1">Password reset</h1>
							<p className="px-2 mb-0">
								Your password was successfully reset
							</p>
							<p className="px-2">
								Please login into your account using your new password
							</p>
							<Button.Ripple
								tag="a"
								onClick={this.onHomeClick}
								color="primary"
								size="lg"
								className="mt-1"
							>
								Return To Login Page
							</Button.Ripple>
						</CardBody>
					</Card>
				</Col>
			</Row>
		)
	}
}

export default EmailSent
