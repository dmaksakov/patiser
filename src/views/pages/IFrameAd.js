import React, {useEffect} from "react";

export const IFrameAd = (props) => {

	useEffect(() => {

		if (document.getElementById('iframe') && document.getElementById('iframe').contentWindow) {

			let frame = document.getElementById('iframe').contentWindow

			frame.document.open()
			frame.document.write(props.adCode)
			frame.document.close()
		}
	}, [])

	const iframe = () => {

		return {
			__html: props.iframe
		}
	}

	return (
		<div dangerouslySetInnerHTML={ iframe() } />
	)
}
