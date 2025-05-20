import React from "react"
import Router from "./Router"
import "./components/@vuexy/rippleButton/RippleButton"
import {history} from "./history";
import { Service } from 'axios-middleware';
import axios from 'axios';
import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"

const service = new Service(axios);

service.register({
	onRequest(config) {
		config = {...config, headers: {...config.headers, 'Authorization': "Bearer " + localStorage.getItem('id_token')}};
		return config;
	},
	onSync(promise) {
		return promise;
	},
	onResponse(response) {
		return response;
	}
});

const App = props => {
	return <Router history={history}/>
}

export default App
