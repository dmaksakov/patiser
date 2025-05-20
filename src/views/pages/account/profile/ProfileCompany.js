import {Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Media, Row} from "reactstrap";
import companyImg from "../../../../assets/img/portrait/small/blank-company-profile.png";
import {Edit} from "react-feather";
import React from "react";
import PrintColumn from "./PrintColumn";

const ProfileCompany = ({company, profile, history}) => {

	return (
		<Card>
			<CardHeader>
				<CardTitle>Company</CardTitle>
			</CardHeader>
			<CardBody>
				<Row>
					<Col xs={12} sm={3} lg={2}>
						<div className="text-align-center">
							<Media
								className="rounded mb-1"
								object
								src={company.logo ? company.logo + '?h=100' : companyImg}
								alt="Generic placeholder image"
								height="100"
								width="auto"
							/>
						</div>
						<Button
							className="mb-1"
							color="primary"
							outline
							block
							onClick={() => history.push("/account/company/edit")}
						>
							<Edit size={15}/>
							<span className="align-middle ml-50">Edit</span>
						</Button>
					</Col>
					<Col xs={12} sm={9} lg={10}>
						<Row>
							<PrintColumn label={'Company nane'} value={company.name}/>
							<PrintColumn label={'Legal name'} value={company.legal_name}/>
							<PrintColumn
								label={'Offers pickup'}
								value={
									company.offers_pickup
										?
											<Badge className={'mr-1 badge-md'} color="success">Yes</Badge>
										:
											<Badge className={'mr-1 badge-md'} color="warning">No</Badge>
								}
							/>
							<PrintColumn
								label={'Offers delivery'}
								value={
									company.offers_delivery
										?
											<Badge className={'mr-1 badge-md'} color="success">Yes</Badge>
										:
											<Badge className={'mr-1 badge-md'} color="warning">No</Badge>
								}
							/>
							<PrintColumn label={'Email'} value={company.email}/>
							{company.address && company.city && company.state_province && company.zip_code && company.country_code.value && <PrintColumn label={'Address'} value={
								`${company.address},
								${company.city},
								${company.state_province},
								${company.zip_code},
								${company.country_code.value}`
							}/>}
							<PrintColumn label={'Phone'} value={company.phone}/>
							<PrintColumn label={'Hour rate'} value={`${company.hour_rate} ${profile.company.currency.code}`}/>
							<PrintColumn
								label={'Package'}
								value={<Badge className={'mr-1 badge-md'} color='success'>{company.package.name}</Badge>}
							/>
							<PrintColumn label={'Currency'} value={`${company.currency.label}`}/>
							<PrintColumn label={'Measure system'} value={company.measure_system.label}/>
							<PrintColumn
								label={'Company status'}
								value={
									company.initialized
										?
											<Badge className={'mr-1 badge-md'} color='success'>Active</Badge>
										:
											<Badge className={'mr-1 badge-md'} color='danger'>Not active</Badge>
								}/>
						</Row>
					</Col>
				</Row>

			</CardBody>
		</Card>
	)
}

export default ProfileCompany
