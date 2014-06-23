

function signinCallback (authResult) {
	console.log("Sign in callback");
	var stored_id = localStorage.getItem("remoter_id");
	if ((typeof stored_id!== 'undefined') && (stored_id!== null) && (stored_id!== "undefined")){
		
		console.log("stored_id");
		$.ajax({
			url:"http://localhost:5000/checkuser/" + stored_id,
			type:"GET",
			success:function(data){
				if(data.error){
					console.log(data.error);
				}else if (data.ok){
					console.log(data.ok);

					check_auth_result(authResult);
				}
			},
			error:function(err) {
				console.log(err);
			}
		});
	}else {
			console.log("no id");
			check_auth_result(authResult);
	}					
		}

	

	function check_auth_result(authResult) {
		if (authResult['access_token']) {
			
			$.ajax({
				url:"http://localhost:5000/auth/" + authResult.access_token,
				type:"GET",
				success:function(data){
					console.log(data);
					localStorage.setItem("remoter_id",data.user_id);
					if (window.opener){//checking if it is a popup
						var remoter_id = localStorage.getItem("remoter_id");
						window.opener.postMessage({remoter_id:remoter_id},"*");
						document.getElementById('signinButton').setAttribute('style', 'display: none');
						window.close();

					}
				},
				error:function(err){
					console.log("Error: " + err);
				}
			});


			
			


		} else if (authResult['error']) {
						    // Ocorreu um erro.
						    // Possíveis códigos de erro:
						    //  "access_denied" - o usuário negou o acesso a seu aplicativo
						    //   "immediate_failed" - não foi possível fazer o login do usuário automaticamente
						    console.log('There was an error: ' + authResult['error']);
						    localStorage.setItem("remoter_id",undefined);
			}
	}