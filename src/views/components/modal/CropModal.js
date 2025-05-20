import React, {useEffect, useRef, useState} from "react";
import {Button, ButtonGroup, Col, Modal, ModalBody, ModalHeader, Row, Spinner} from "reactstrap";
import Cropper from "react-cropper";
import {RefreshCw, RotateCcw, RotateCw, Shuffle} from "react-feather";
import 'cropperjs/dist/cropper.css';

const CropModal  = ({ratio,title, isOpen, isSaving, setSaving, toggleOpen, file,onFinish}) =>{
	let myCropper = useRef(null);
	let fr = new FileReader();
	let [src,setSrc] = useState("");
	let [scaleHorizontalFlipped, setScaleHorizontalFlipped] = useState(false);
	let [style, setStyle] = useState({
		height: 400,
		width: '100%'
	});
	let aspectRatio = ratio? ratio : 1;

	const getSrc = file =>{

		fr.readAsDataURL(file);
		fr.onload = () =>{
			setSrc(fr.result);
		};
	}
	useEffect(() => {
		file && getSrc(file);
	});

	const doCrop = ()=>{
		setSaving(true);
		let dataURI = myCropper.current.getCroppedCanvas().toDataURL();
		let byteString = atob(dataURI.split(',')[1]);

		// separate out the mime component
		let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to an ArrayBuffer
		let ab = new ArrayBuffer(byteString.length);
		let ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		onFinish(new Blob([ab], {type: mimeString}), file.name);
	}

	const onRotateCW = () =>{
		myCropper.current.rotate(45);
	}
	const onRotateCcW = () =>{
		myCropper.current.rotate(-45);
	}
	const onRefresh = () =>{
		myCropper.current.reset();
	}
	const onToggleFlip = () =>{
		if(scaleHorizontalFlipped===true){
			myCropper.current.scale(1,1);
			setScaleHorizontalFlipped(false);
		}
		else{
			myCropper.current.scale(-1,1);
			setScaleHorizontalFlipped(true);
		}
	}

	const onCropperReady = () =>{

	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggleOpen}
			className="modal-dialog-centered modal-lg"
		>
			<ModalBody className="">
				<Row>
					<Col md={12} sm={12}>
						<Cropper
							ref={myCropper}
							src={src}
							style={style}
							// Cropper.js options
							aspectRatio={aspectRatio}
							guides={true}
							ready={onCropperReady}
						/>
					</Col>
				</Row>
				<Row className={"mt-1"}>
					<Col md={8} sm={12} className={"mt-1"}>
						<ButtonGroup>
							<Button.Ripple outline color="primary" onClick={onRefresh}>
								<RefreshCw size={14} />
							</Button.Ripple>
							<Button.Ripple outline color="primary" onClick={onRotateCW}>
								<RotateCw size={14} />
							</Button.Ripple>
							<Button.Ripple  outline color="primary" onClick={onRotateCcW}>
								<RotateCcw size={14} />
							</Button.Ripple>
							<Button.Ripple  outline color="primary" onClick={onToggleFlip}>
								<Shuffle size={14} />
							</Button.Ripple>
						</ButtonGroup>

					</Col>
					<Col md={4} sm={12} className={"mt-1"}>
						<Button className="mr-1 mb-1" outline color="success" onClick={doCrop} >
							{isSaving===true && <Spinner color="success" size="sm" type="grow" />}
							{ isSaving ? "Saving..." : "Save & Upload" }
						</Button>
						<Button className="mr-1 mb-1" color="warning" onClick={toggleOpen} >
							Cancel
						</Button>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
}

export default CropModal;
