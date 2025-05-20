import React, {useCallback, useState} from 'react'
import { Field, reduxForm } from 'redux-form'
import userImg from "../../../assets/img/portrait/small/blank-profile-picture.png"
import {
	Media,
	Row,
	Col,
	Button,
	Input,
	Label,
	FormGroup,
} from "reactstrap"
import {connect} from "react-redux"
import {API_URL} from '../../../config';
import {useDropzone} from "react-dropzone";
import axios from "axios";
import accountActions from "../../../redux/account/actions";
import CropModal from "../../components/modal/CropModal";

const {
	getProfileRequest,
} = accountActions

const Dropzone = (props) => {

	const fileUpload = (file) => {
		const url = API_URL + 'profile/picture';
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
				props.getProfileRequest();
			})
			.catch((err) => {
			});
	}

	return (
		<div className="">
			<CropModal
				title="Edit Profile Picture before uploading"
				isOpen={isOpen}
				isSaving={isSaving}
				setSaving={setSaving}
				toggleOpen={toggleCropModal}
				file={currentImage}
				onFinish={handleFileUpload}
				ratio={1}
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

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
	<div>
		<Label>{label}</Label>
		<Input
			{...input}
			type={type}
			placeholder={label}
		/>
		{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
	</div>
)

let ProfileForm = props => {

	const { handleSubmit, pristine, reset, submitting, profile, getProfileRequest } = props

	return profile.company ? (
		<Row>
			<Col sm={12}>
				<Media className="mb-2">
					<Media className="mr-2 my-25" left href="#">
						<Media
							className="users-avatar-shadow rounded"
							object
							src={profile.profile_picture ? profile.profile_picture + '?h=100' : userImg}
							alt="user profile image"
							height="100"
							width="auto"
						/>
					</Media>
					<Media className="mt-2" body>
						<Media className="font-medium-1 text-bold-600" tag="p" heading>
							{profile.first_name + ' ' + profile.last_name}
						</Media>
						<div className="d-flex flex-wrap">
							<Dropzone
								getProfileRequest={getProfileRequest}
							/>
						</div>
					</Media>
				</Media>
			</Col>
			<Col sm={12}>
				<Row>
					<Col sm={6}>

					</Col>
					<Col sm={6}>
						<form onSubmit={handleSubmit}>
							<Row>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="first_name"
												component={renderField}
												type="text"
												label="First Name"
											/>
										</div>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup>
										<div>
											<Field
												name="last_name"
												component={renderField}
												type="text"
												label="Last Name"
											/>
										</div>
									</FormGroup>
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
			</Col>
		</Row>
	) : ''
};

ProfileForm = reduxForm({
	form: 'profileForm',
	enableReinitialize: true
})(ProfileForm)

ProfileForm = connect(
	state => ({
		initialValues: state.account.toJS().profile
	}),
	{
		getProfileRequest,
	}
)(ProfileForm)

export default ProfileForm
