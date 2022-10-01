import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router,} from "react-router-dom";
import "./index.scss";
import Appli from "./Appli";
import Amplify from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config)

const eltRacine = ReactDOM.createRoot(document.getElementById("racine"));
eltRacine.render(
	<React.StrictMode>
		<Router>
			<Appli />
		</Router>
	</React.StrictMode>
);