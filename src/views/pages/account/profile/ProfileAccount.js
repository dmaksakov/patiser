import {Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Media, Row} from "reactstrap";
import userImg from "../../../../assets/img/portrait/small/blank-profile-picture.png";
import {Edit} from "react-feather";
import React from "react";
import PrintColumn from "./PrintColumn";

const Cols = {
	labelCol: {
		xs: 3,
		sm: 4
	},
	valueCol: {
		xs: 9,
		sm: 8
	}
}

const ProfileAccount = ({profile, history}) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Account</CardTitle>
			</CardHeader>
			<CardBody>
				<Row>
					<Col xs={12} sm={3} lg={2}>
						<div className="text-align-center">
							<Media
								className="rounded mb-1"
								object
								src={profile.profile_picture? profile.profile_picture + '?h=100' : userImg}
								alt="Generic placeholder image"
								height="100"
								width="auto"
							/>
							<Button
								className="mb-1"
								color="primary"
								outline
								onClick={() => history.push("/account/profile/edit")}
								block
							>
								<Edit size={15}/>
								<span className="align-middle ml-50">Edit</span>
							</Button>
						</div>
					</Col>
					<Col xs={12} sm={9} lg={10}>
						<Row>
							<PrintColumn label={'Email'} value={profile.username} labelCol={Cols.labelCol} valueCol={Cols.valueCol}/>
							<PrintColumn label={'Name'} value={`${profile.first_name} ${profile.last_name}`} labelCol={Cols.labelCol} valueCol={Cols.valueCol}/>
							<PrintColumn
								label={'Status'}
								value={profile.active
										?
											<Badge className={'mr-1 badge-md'} color="success">Active</Badge>
										:
											<Badge className={'mr-1 badge-md'} color="danger">Not active</Badge>
								}
								labelCol={Cols.labelCol}
								valueCol={Cols.valueCol}
							/>
							<PrintColumn
								label={'Roles'}
								value={profile.roles && profile.roles.map((role, i) => <Badge className={'mr-1 badge-md'} color="success" key={i}>{role.name}</Badge>)}
								labelCol={Cols.labelCol}
								valueCol={Cols.valueCol}
							/>
						</Row>
					</Col>
				</Row>
			</CardBody>
		</Card>
	)
}

export default ProfileAccount
