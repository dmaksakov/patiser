import React, {useEffect, useRef} from "react";
import {Row, Col} from "reactstrap";

export const AmazonAd = () => {

	const mounted = useRef();

	useEffect(() => {

		if (!mounted.current) {

			const script2 = document.createElement('script')
			script2.src = '//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=5d6a3974-8384-4016-a7c5-f4c89dc5fb61'
			script2.async = true

			const amazonAdd = document.querySelector('#amzn-assoc-ad-5d6a3974-8384-4016-a7c5-f4c89dc5fb61')
			if (amazonAdd) {
				amazonAdd.appendChild(script2)
			}

			// const script = document.createElement('script')
			// script.async = false
			// script.text = `amzn_assoc_placement = "adunit0";
			// 		amzn_assoc_search_bar = "true";
			// 		amzn_assoc_tracking_id = "patiser-20";
			// 		amzn_assoc_search_bar_position = "bottom";
			// 		amzn_assoc_ad_mode = "search";
			// 		amzn_assoc_ad_type = "smart";
			// 		amzn_assoc_marketplace = "amazon";
			// 		amzn_assoc_region = "US";
			// 		amzn_assoc_title = "Shop Related Products";
			// 		amzn_assoc_default_search_phrase = "Pure Super Agar Powder";
			// 		amzn_assoc_default_category = "All";
			// 		amzn_assoc_linkid = "6e861aef6e62012eba2728ab643a73d7";
			// 		amzn_assoc_rows = "1";`
			//
			// const script2 = document.createElement('script')
			// script2.src = '//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US'
			// script2.async = false
			//
			// const amazonAdd = document.querySelector('#amzn_assoc_ad_div_adunit0_0')
			// if (amazonAdd) {
			// 	amazonAdd.appendChild(script)
			// 	amazonAdd.appendChild(script2)
			// }
		} else {

		}

	}, [])

	return (
		<Row className="text-align-center">
			<Col xs={12}>
				{/*<div id="amzn_assoc_ad_div_adunit0_0"/>*/}

				<div id="amzn-assoc-ad-5d6a3974-8384-4016-a7c5-f4c89dc5fb61"></div>
			</Col>
		</Row>
	)
}
