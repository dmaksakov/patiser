import React from "react"
import {Button, Card, CardBody, Col, Row} from "reactstrap"
import underMaintenance from "../../assets/img/pages/login.png"

class EmailSent extends React.Component {

	onHomeCLick = () =>{
		this.props.history.push("/");
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
								className="img-fluid align-self-center mt-75 width-inherit"
							/>
							<h1 className="font-large-2 my-1">An email message was sent</h1>
							<p className="px-2 mb-0">
								If there is an account with the email you provided then you should receive an email message shortly.
							</p>
							<p className="px-2">
								Please follow the instructions in the email to recover your password.
							</p>
							<Button.Ripple
								tag="a"
								onClick={this.onHomeCLick}
								color="primary"
								size="lg"
								className="mt-1"
							>
								Back to Home
							</Button.Ripple>
						</CardBody>
					</Card>
				</Col>
			</Row>
		)
	}
}

export default EmailSent
