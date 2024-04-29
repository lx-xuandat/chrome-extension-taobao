import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToolBar } from './components/ToolBar'
import { ButtonAddToCart } from './components/ButtonAddToCart';

import { e } from '@configs'
import './index.scss'

(function (elements) {
	elements.forEach((e) => {
		let eDiv = document.createElement("div");
		eDiv.id = e.id;
		switch (e.component) {
			case 'ToolBar':
				if (document?.body?.firstChild !== undefined) {
					document.body.insertBefore(eDiv, document.body.firstChild);
					ReactDOM.createRoot(document.getElementById(e.id)).render(
						<React.StrictMode>
							<ToolBar />
						</React.StrictMode>,
					)
				}
				break;
			case 'ButtonAddToCart':
				// var orderButtonWrapperDiv = document.querySelector('.order-button-wrapper');

				// if (orderButtonWrapperDiv) {
				// 	orderButtonWrapperDiv.firstChild.style.display = 'none'
				// 	orderButtonWrapperDiv.appendChild(eDiv);
				// } else {
				// 	const divOrder = document.getElementsByClassName('BasicContent--itemInfo--2NdSOrj')
				// 	if (divOrder !== undefined && divOrder[0] !== undefined) {
				// 		divOrder[0].insertBefore(eDiv, divOrder[0].lastChild);
				// 	}
				// }

				// ReactDOM.createRoot(document.getElementById(e.id)).render(
				// 	<React.StrictMode>
				// 		<ButtonAddToCart />
				// 	</React.StrictMode>,
				// )

				break;
			default:
				break;
		}
	});
})([e.toolbar, e.btn_add_to_cart])
