import React, {useCallback, useState} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Button, Col, FormGroup, Media, Row,} from "reactstrap"
import {connect} from "react-redux"
import renderTextField from "../../form/elements/textField"
import renderSelectField from "../../form/elements/selectField"
import renderCheckBox from "../../form/elements/checkBox"
import companyActions from "../../../redux/company/actions"
import userImg from "../../../assets/img/portrait/small/blank-company-profile.png";
import {API_URL} from '../../../config';
import {useDropzone} from "react-dropzone";
import axios from "axios";
import CropModal from "../../components/modal/CropModal";
import {
	required,
	number,
	email,
	digitsOnly,
} from '../../../config/valiadationConfig'

const {
	getCompanyRequest,
} = companyActions

const Dropzone = (props) => {

	const fileUpload = (file) => {
		const url = API_URL + 'client/company/logo';
		const formData = new FormData();
		formData.append('file',file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
				'Authorization': "Bearer " + localStorage.getItem('id_token')
			}
		}
		return axios.post(url, formData, config);
	}

	const onDrop = useCallback((acceptedFiles) => {
		setCurrentImage(acceptedFiles[0]);
		setOpen(true);
	}, [])

	const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
		// Disable click and keydown behavior
		accept: "image/*",
		onDrop,
		noClick: true,
		noKeyboard: true
	});

	let [isOpen, setOpen] = useState(false);
	let [isSaving, setSaving] = useState(false);
	let [currentImage, setCurrentImage] = useState("");

	const toggleCropModal = () => {
		setOpen(!isOpen);
	}

	const handleFileUpload = (file) => {
		fileUpload(file)
			.then(() => {
				setSaving(false);
				setOpen(false);
				props.getCompanyRequest();
			})
			.catch((err) => {
			});
	}

	return (
		<div className="">
			<CropModal
				title="Edit Logo before uploading"
				isOpen={isOpen}
				isSaving={isSaving}
				setSaving={setSaving}
				toggleOpen={toggleCropModal}
				file={currentImage}
				onFinish={handleFileUpload}
				ratio={9/6}
			/>
			<div {...getRootProps({className: 'dropzone'})}>
				<input {...getInputProps()} />
				<Button color={'warning'} type="button" onClick={open}>
					Change picture
				</Button>
			</div>
		</div>
	);
}

let CompanyForm = props => {

	const { handleSubmit, pristine, reset, submitting, company, getCompanyRequest, error } = props

	return company ? (
		<Row>
			<Col sm={12}>

				<Media className="mb-2">
					<Media className="mr-2 my-25" left href="#">
						<Media
							className="users-avatar-shadow rounded"
							object
							src={company.logo ? company.logo + '?h=100' : userImg}
							alt="company profile image"
							height="100"
							width="auto"
						/>
					</Media>
					<Media className="mt-2" body>
						<div className="d-flex flex-wrap">
							<Dropzone
								getCompanyRequest={getCompanyRequest}
							/>
						</div>
					</Media>
				</Media>

				<form onSubmit={handleSubmit}>
					<Row>
						<Col sm={6}>
							<Row>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="name"
												component={renderTextField}
												type="text"
												label="Company Name"
												validate={required}
											/>
										</div>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="legal_name"
												component={renderTextField}
												type="text"
												label="Legal Name"
											/>
										</div>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="offers_pickup"
												component={renderCheckBox}
												type="text"
												label="Offers pickup"
											/>
										</div>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="offers_delivery"
												component={renderCheckBox}
												type="text"
												label="Offers delivery"
											/>
										</div>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="email"
												component={renderTextField}
												type="email"
												label="Email"
												validate={email}
											/>
										</div>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="phone"
												component={renderTextField}
												type="text"
												label="Phone"
												validate={digitsOnly}
											/>
										</div>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="hour_rate"
												component={renderTextField}
												type="number"
												step="0.01"
												label="Hour rate"
												validate={[required, number]}
											/>
										</div>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="currency"
												component={renderSelectField}
												label="Currency"
												options={props.currencies}
											/>
										</div>
									</FormGroup>
								</Col>
							</Row>
						</Col>
						<Col sm={6}>
							<Row>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="address"
												component={renderTextField}
												type="text"
												label="Address"
											/>
										</div>
									</FormGroup>
								</Col>

								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="city"
												component={renderTextField}
												type="text"
												label="City"
											/>
										</div>
									</FormGroup>
								</Col>

								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="state_province"
												component={renderTextField}
												type="text"
												label="State/Province"
											/>
										</div>
									</FormGroup>
								</Col>

								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="zip_code"
												component={renderTextField}
												type="text"
												label="Zip/Postal Code"
											/>
										</div>
									</FormGroup>
								</Col>

								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="country_code"
												component={renderSelectField}
												label="Country"
												options={props.countries}
											/>
										</div>
									</FormGroup>
								</Col>

							</Row>
						</Col>
						<Col className="d-flex justify-content-end flex-wrap mt-2" sm="12">
							<Button.Ripple
								className="mr-1"
								color="success"
								type="submit"
								disabled={pristine || submitting}
							>
								Save Changes
							</Button.Ripple>
							<Button.Ripple
								color="flat-warning"
								type="button"
								disabled={pristine || submitting}
								onClick={reset}
							>
								Reset
							</Button.Ripple>
						</Col>
					</Row>
				</form>
			</Col>
		</Row>
	) : ''
};

CompanyForm = reduxForm({
	form: 'CompanyForm',
	enableReinitialize: true
})(CompanyForm)

CompanyForm = connect(
	state => ({
		initialValues: state.company.toJS().company
	}),
	{
		getCompanyRequest,
	}
)(CompanyForm)

export default CompanyForm
