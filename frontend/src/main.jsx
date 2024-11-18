import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";

import 'bootstrap/dist/css/bootstrap.min.css';

let persistor = persistStore(store);

const root = createRoot(document.getElementById("root")); // Create a root

root.render( // Use root.render instead of ReactDOM.render
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter> {/* Removed future flags for proper routing */}
					<App />
					<ToastContainer
						position="bottom-center"
						autoClose={2000}
						hideProgressBar={true}
						closeButton={false}
						theme="colored"
						icon={false}
					/>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
