function setElement(cntParent, strElement, strID, strType, strValue, strClass, blnCreateText, blnIsPicture) {
	// Create a templated element with an ID
	let tmpElement = document.createElement(strElement);

	// If the element needs a text
	if (blnCreateText) {
		// Create a text node and add to the element
		let tmpText = document.createTextNode(strValue);
		tmpElement.append(tmpText);
	} // End if

	// If the element needs a picture
	if (blnIsPicture) {
		// Set its source based on the given value
		tmpElement.src = strValue;
	}
	else {
		if (strValue != '') {
			// Set an attribute to place the strValue
			tmpElement.setAttribute('value', strValue);
		}
	} // End if

	// Give the tempalted element to the parent
	cntParent.append(tmpElement);

	// Finish with additional specifiec attributes
	tmpElement.setAttribute('id', strID);

	if (strType != '') {
		tmpElement.setAttribute('type', strType);
	}
	if (strClass != '') {
		tmpElement.setAttribute('class', strClass);
	}

	return tmpElement;
} // End of setElement function

function removeContent(cntParent) {
	while (cntParent.firstChild) {
		cntParent.removeChild(cntParent.firstChild);
	} // End while
}

function setFade(blnFadeIn) {

	if (blnFadeIn) {
		setElement(document.body, 'div', 'cntFadeIn', '', '', '', false, false);

		setTimeout(function () { cntFadeIn.remove(); }, 480);
	} else {
		setElement(document.body, 'div', 'cntFadeOut', '', '', '', false, false);

		setTimeout(function () { removeContent(document.body); }, 480);
	}
}

function parseCookies() {
	// Get cookies
	objCookies = Cookies.get();

	// For each key in objCookies
	for (let objKey in objCookies) {

		// If the value in key consists of only digits
		if (!isNaN(objCookies[objKey])) {

			// Convert the string value to integer
			objCookies[objKey] = parseInt(objCookies[objKey]);
		}
	}
}

function setCookies() {

	// Populate the cookies
	Cookies.set('energy', 100, {sameSite: 'strict', expires: 7 });
	Cookies.set('hunger', 100, {sameSite: 'strict', expires: 7 });
	Cookies.set('social', 100, {sameSite: 'strict', expires: 7 });

	// Retract the populated cookies
	parseCookies();
}

function addCookies(strName, strValue) {
	// Populate the cookie
	Cookies.set(strName, strValue, {sameSite: 'strict', expires: 7});

	// Set the key and value to objCookies
	objCookies[strName] = strValue;
}

function getPremadeContainer(intSelection) {
	switch (intSelection) {
		case 0: // Main
			setElement(document.body, 'img', 'imgTenant', 'image/png', 'img/char/tenant/normal.png', 'image', false, true);
			setElement(document.body, 'div', 'cntCommand', '', '', 'container', false, false);
			setElement(cntCommand, 'div', 'cntStatus', '', '', 'container', false, false);
			setElement(cntCommand, 'div', 'cntButtonsMain', '', '', 'container', false, false);

			setElement(cntStatus, 'label', 'lblEnergy', '', 'Energy: ' + arrVariables[0] + '/' + arrVariables[3], 'label', true, false);
			setElement(cntStatus, 'label', 'lblHunger', '', 'Hunger: ' + arrVariables[1] + '/' + arrVariables[4], 'label', true, false);
			setElement(cntStatus, 'label', 'lblSocial', '', 'Social: ' + arrVariables[2] + '/' + arrVariables[5], 'label', true, false);
			setElement(cntButtonsMain, 'input', 'btnSleep', 'button', 'Sleep', 'button', false, false);
			setElement(cntButtonsMain, 'input', 'btnEat', 'button', 'Eat', 'button', false, false);
			setElement(cntButtonsMain, 'input', 'btnTalk', 'button', 'Talk', 'button', false, false);
			setElement(cntButtonsMain, 'input', 'btnLeave', 'button', 'Leave', 'button', false, false);

			btnLeave.style.marginRight = '0px';

			btnEat.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, -10, 1, 20], 0, true);};
			btnSleep.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, 20, 1, -10], 1, true);};
			btnTalk.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, -10, 2, 20], 2, true);};
			btnLeave.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, -10, 2, 20], 3, false);};

			setTimeout(function() {setBlink();}, 4000);
			setInterval(function(){getBackgroundUpdate(arrVariables, arrTexts)}, 7500);

			setCenter(imgTenant)

			break;
		case 1: // Login
			setElement(document.body, 'div', 'cntLogin', '', '', 'container', false, false);
			setElement(cntLogin, 'img', 'imgAdvocateLogin', 'image/png', 'img/char/advocate/normal.png', 'image', false, true);
			setElement(cntLogin, 'label', 'lblTitle', '', 'Welcome', 'label', true, false);
			setElement(cntLogin, 'label', 'lblParagraphLogin', '', 'Provide me your given data card from your last visit:', 'label', true, false);
			setElement(cntLogin, 'input', 'boxDataLogin', 'textbox', '', 'textbox', false, false);
			setElement(cntLogin, 'div', 'cntButtonsLogin', '', '', 'container', false, false);
			setElement(cntButtonsLogin, 'input', 'btnContinueLogin', 'button', 'Here it is!', 'button', false, false);
			setElement(cntButtonsLogin, 'input', 'btnBackLogin', 'button', 'Huh?', 'button', false, false);

			btnContinueLogin.onclick = function(){getValidation(arrVariables, arrTexts);};
			btnBackLogin.onclick = function(){
				setEvent(arrVariables, arrTexts, [], 4, false);};
			break;
		case 2: // Logout
			setElement(document.body, 'div', 'cntPrompt', '', '', 'container', false, false);
			setElement(cntPrompt, 'img', 'imgAdvocateLogout', 'image/png', 'img/char/advocate/normal.png', 'image', false, true);
			setElement(cntPrompt, 'label', 'lblTitle', '', 'Aww, leaving already?', 'label', true, false);
			setElement(cntPrompt, 'label', 'lblParagraphLogout', '', 'Before you go, here is our data card. Please don\'t forget about our existance!', 'label', true, false);
			setElement(cntPrompt, 'input', 'boxData', 'textbox', getDataCard(arrVariables), 'textbox', false, false);
			setElement(cntPrompt, 'div', 'cntButtonsLogout', '', '', 'container', false, false);
			setElement(cntButtonsLogout, 'input', 'btnContinueLogout', 'button', 'See ya!', 'button', false, false);
			setElement(cntButtonsLogout, 'input', 'btnBackLogout', 'button', 'Hold on', 'button', false, false);

			btnContinueLogout.onclick = function(){location.href = 'https://www.google.com/';};
			btnBackLogout.onclick = function(){setCanvas(arrVariables, arrTexts, 1, 0, true, false)};
			break;
		default: // First time prompt
			setElement(document.body, 'div', 'cntFirstTimePopup', '', '', '', false, false);
			setElement(cntFirstTimePopup, 'label', 'lblHeader', '', 'INFORMATION', 'label', true, false);
			setElement(cntFirstTimePopup, 'label', 'lblInformation00', '', 'This website uses cookies to autosave progress.', 'label', true, false);
			setElement(cntFirstTimePopup, 'label', 'lblInformation01', '', 'To avoid loss of progress, ensure that your browser does not delete cookies upon close for this website.', 'label', true, false);
			setElement(cntFirstTimePopup, 'label', 'lblInformation01', '', 'Nevertheless, enjoy the experience!', 'label', true, false);
			setElement(cntFirstTimePopup, 'input', 'btnOK', 'button', 'OK', 'button', false, false);
			setElement(document.body, 'audio', 'audFirstClick', 'audio/ogg', 'aud/firstClick.ogg', '', false, true);
	}
}

function getPixelsFromViewpoint(numViewpoint, numInnerScreenSize) {
	return (numViewpoint * numInnerScreenSize) / 100
}

function getViewpointFromPixels(numPixels, numInnerScreenSize) {
	return (100 * numPixels) / numInnerScreenSize
}

function setCenter(objElement) {
	let dblWidth = objElement.width
	let dblHeight = objElement.height
	let dblScale = setScale(objElement)
	let dblCenterX = getViewpointFromPixels((window.innerWidth - dblWidth)/2, window.innerWidth)
	let dblCenterY = getViewpointFromPixels((window.innerHeight - dblHeight)/2, window.innerHeight)

	objElement.style.transform = setTransform(dblCenterX, "vw", dblCenterY, "vh", dblScale)
}

function setScale(objElement) {
	return window.innerHeight / INITAL_HEIGHT
}

function setTransform(dblX, strXBy, dblY, strYBy, dblScale) {
	return "translate(" + dblX + strXBy + "," + dblY + strYBy + ") scale(" + dblScale +")"
}

function getTransformInformation(objElement, strCode) {
	objReference = getComputedStyle(objElement)
	arrNumbers = objReference.transform.substring(7, objReference.transform.length-1).split(",")

	if (strCode == "transformX") {
		return arrNumbers[4]
	} else if (strCode = "transformY") {
		return arrNumbers[3]
	} else if (strCode = "scale") {
		return arrNumbers[0]
	} else if (strCode == "transformXViewportHeight") {
		return getViewpointFromPixels(arrNumbers[4], window.innerHeight)
	} else if (strCode == "transformXViewportWidth") {
		return getViewpointFromPixels(arrNumbers[4], window.innerWidth)
	} else if (strCode == "transformYViewportHeight") {
		return getViewpointFromPixels(arrNumbers[3], window.innerHeight)
	} else if (strCode == "transformYViewportWidth") {
		return getViewpointFromPixels(arrNumbers[3], window.innerWidth)
	}
}
