window.addEventListener('load', function () {

    // If no cookies are present
    if (document.cookie == '') {

        // If the location is on the specified domain
        // Else if the location is not localhost
        if (this.location.hostname == 'abanoy.github.io') {   // <--- This is where the website domain will be entered

            if (1 == 0) { // (Empty it for Non-cookie development)
                setFade(true);
                getPremadeContainer();

                btnOK.onclick = function() {
                    audFirstClick.play();

                    setCookies();

                    setTimeout(function() {setFade(false);}, 3000)
                    setTimeout(function() {startCare();}, 3500);
                }
            } else {
                setCookies();
                startCare();
            }

        } else if (this.location.hostname != '') {   // If the hostname is not localhost
            alert('Unrecognized host.');
        } else { // Presuming it is localhost

            setCookies();
            startCare();
        }
    } else {
        parseCookies();

        // TODO: Check if the player would still be alive

        startCare();
    }


});

window.addEventListener('beforeunload', function (e) {
    for (let objKey in objCookies) {
        Cookies.set(objKey, objCookies[objKey], {sameSite: 'strict', expires: 7 });
    }
});
