

function signinCallback (authResult) {
	if (authResult['access_token']) {
		if (window.opener){//checking if it is a popup
		window.opener.postMessage(authResult,"*");
		document.getElementById('signinButton').setAttribute('style', 'display: none');
		window.close();
	}

	} else if (authResult['error']) {
					    // Ocorreu um erro.
					    // Possíveis códigos de erro:
					    //  "access_denied" - o usuário negou o acesso a seu aplicativo
					    //   "immediate_failed" - não foi possível fazer o login do usuário automaticamente
					    console.log('There was an error: ' + authResult['error']);
					}
				}