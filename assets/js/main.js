if(document.querySelector('form.rigister.form') != null){
var rigisterForm = document.querySelector('form.rigister.form'),
submitRigisterFormBtn = rigisterForm.querySelector('form.rigister.form button[type=submit]');

let rigisterFormEmail = rigisterForm.querySelector('form.rigister.form input[name=email]'),
rigisterFormPassword = rigisterForm.querySelector('form.rigister.form input[name=password]'),
rigisterFormName = rigisterForm.querySelector('form.rigister.form input[name=name]');

let rigisterFormObject = {'name': null, "password": null, "email":null};

document.querySelector('.model').style.display = "none";

function modelShow(message, color){
document.querySelector('.model').style.display = "flex";
document.querySelector('.model .message h1').style.color = color;
document.querySelector('.model .message h1').textContent = message;
}

document.querySelector('.model p').onclick = () => document.querySelector('.model').style.display = "none";

 var accounts = [];
if(localStorage.getItem('accounts') != null){
	accounts = JSON.parse(localStorage.getItem('accounts'));
}else{
    accounts = [];
}

let weakness = "password length should be > 6";

let sympols = /[-`'".,"'`!@#$%^&*()_+=<>?:?~/\*|`]/;
rigisterFormPassword.onkeyup = function(e){
	console.log("password length = " + rigisterFormPassword.value.length)
	if(!(rigisterFormPassword.value.length > 6)){
		weakness = "password length should be > 6";
		document.querySelector('.srength span.weak').style.width = "0%";
	}else{
		weakness = 'password length should be strong';
		document.querySelector('.srength span.weak').style.width = "100%";
	}

	if(rigisterFormPassword.value.match(/[a-z]/) && (rigisterFormPassword.value.length > 6)){
        weakness = 'password length should be strong';
		document.querySelector('.srength span.weak').style.width = "100%";
        document.querySelector('.srength span.medium').style.width = "100%";
	}else{
        document.querySelector('.srength span.medium').style.width = "0%";
	}
	if(rigisterFormPassword.value.match(sympols) && ( rigisterFormPassword.value.match(/[a-z]/) && (rigisterFormPassword.value.length > 6)) ){
        weakness = 'password strong';
		document.querySelector('.srength span.weak').style.width = "100%";
        document.querySelector('.srength span.medium').style.width = "100%";
        document.querySelector('.srength span.strong').style.width = "100%";
	}else{
        document.querySelector('.srength span.strong').style.width = "0%";
	}
console.log(weakness)
}


submitRigisterFormBtn.onclick = function(e){
	e.preventDefault();
    rigisterFormObject.name = rigisterFormName.value;
    rigisterFormObject.email = rigisterFormEmail.value;
    rigisterFormObject.password = rigisterFormPassword.value;
    let checkFound = false;
    if(rigisterFormEmail.value.length > 0 || rigisterFormName.length > 0 || rigisterFormPassword.length > 0){
    if(localStorage.getItem('accounts') != null){
    for (let i = 0; i < JSON.parse(localStorage.getItem('accounts')).length; i++) {
    	if(rigisterFormEmail.value == JSON.parse(localStorage.getItem('accounts'))[i].email) {
    	 checkFound = true;
    	 break;
    	}
    }
    if(!checkFound){
    	if(weakness != "password strong"){
           modelShow(weakness, "red"); 
    	}else{
    	modelShow('Success rigister go to sign in', 'green');
    	  accounts.push(rigisterFormObject);
          localStorage.setItem('accounts', JSON.stringify(accounts));
          accounts = JSON.parse(localStorage.getItem('accounts'));
      }
      }else{
    	 modelShow('This email is already exists', "red"); 
      }
}else{
      if(weakness != "password strong"){
           modelShow(weakness, "red"); 
    	}else{
    	modelShow('Success rigister go to sign in', 'green');
    	  accounts.push(rigisterFormObject);
          localStorage.setItem('accounts', JSON.stringify(accounts));
          accounts = JSON.parse(localStorage.getItem('accounts'));
      }   
}
}else{
		modelShow('You shoul enter all fields', "red");

}
}

// =====================================================================

var signForm = document.querySelector('form.signIn.form'),
submitSignFormBtn = signForm.querySelector('form.signIn.form button[type=submit]');

let signFormEmail = signForm.querySelector('form.signIn.form input[name=email]'),
signFormPassword = signForm.querySelector('form.signIn.form input[name=password]');

submitSignFormBtn.onclick = function(e){
	e.preventDefault();
    let checkFound = false,
    placeEmail = 0;
    if(localStorage.getItem('accounts') != null){
    for (let i = 0; i < JSON.parse(localStorage.getItem('accounts')).length; i++) {
    	if(signFormEmail.value == JSON.parse(localStorage.getItem('accounts'))[i].email) {
    	 checkFound = true;
    	 placeEmail = i;
    	 break;
    	}
    }
    if(!checkFound){
    	  modelShow('This email is not exists', "red"); 
      }else{
    	if(signFormPassword.value == JSON.parse(localStorage.getItem('accounts'))[placeEmail].password) {
    	       modelShow('Success sign in, Thanks', 'green'); 
    	       setTimeout(() => location.href = 'gallery.html' ,1500)
    	}else{
               modelShow('Password or email is wrong', "red"); 
    	}
      }
      }else{
          modelShow('This email is not exists', "red");
      }
	}
}