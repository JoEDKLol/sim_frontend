const checkInputData = (userObj) => {
    //userName:'', email:'', password:'', repassword:''
    let retObj={yn:"", str:"", field:""};

    let regExp = /^[a-zA-Z0-9]{4,12}$/; //name check
    let e_regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var pw_regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    

    if(userObj.userName == ""){
        retObj.yn = false;
        retObj.field = "name";
        retObj.str = "Please check your name";
        return retObj;    
    }

    if(userObj.email == ""){
        retObj.yn = false;
        retObj.field = "email";
        retObj.str = "Please check your email";
        return retObj;
    }

    if(userObj.password == ""){
        retObj.yn = false;
        retObj.field = "password";
        retObj.str = "Please check your password";
        return retObj;
    }

    if(userObj.repassword == ""){
        retObj.yn = false;
        retObj.field = "repassword";
        retObj.str = "Please check your repassword";
        return retObj;
    }

    if(!regExp.test(userObj.userName)){
        retObj.yn = false;
        retObj.field = "name";
        retObj.str = "Please enter 4 to 12 digits";
        return retObj;
    }

    if(!e_regExp.test(userObj.email)){
        retObj.yn = false;
        retObj.field = "email";
        retObj.str = "Please check your email";
        return retObj;
    }

    if(userObj.password != userObj.repassword){
        retObj.yn = false;
        retObj.field = "password";
        retObj.str = "Please check your password";
        return retObj;
    }

    if(!pw_regex.test(userObj.password)){
        retObj.yn = false;
        retObj.field = "pw_regex";
        retObj.str = "Please use 8 to 20 characters, letters, numbers, and special characters.";
        return retObj;
    }

    retObj.yn = true;
    retObj.field = "";
    retObj.str = "success";
    return retObj;

}

const checkPassword = (pwObj) => {
    let retObj={yn:"", str:"", field:""};
    var pw_regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    if(pwObj.password == ""){
        retObj.yn = false;
        retObj.field = "password";
        retObj.str = "Please check your password";
        return retObj;
    }

    if(pwObj.repassword == ""){
        retObj.yn = false;
        retObj.field = "repassword";
        retObj.str = "Please check your repassword";
        return retObj;
    }

    if(pwObj.password != pwObj.repassword){
        retObj.yn = false;
        retObj.field = "password";
        retObj.str = "Please check your password";
        return retObj;
    }

    if(!pw_regex.test(pwObj.password)){
        retObj.yn = false;
        retObj.field = "pw_regex";
        retObj.str = "Please use 8 to 20 characters, upper and lower case letters, numbers, and special characters.";
        return retObj;
    }

    retObj.yn = true;
    retObj.field = "";
    retObj.str = "success";
    return retObj;

}

const checkEmail = (emObj) => {
    let retObj={yn:"", str:"", field:""};
    let e_regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if(emObj.email == ""){
        retObj.yn = false;
        retObj.field = "email";
        retObj.str = "Please check your email";
        return retObj;
    }

    if(!e_regExp.test(emObj.email)){
        retObj.yn = false;
        retObj.field = "email";
        retObj.str = "Please check your email";
        return retObj;
    }

    retObj.yn = true;
    retObj.field = "";
    retObj.str = "success";
    return retObj;
}

export {checkInputData, checkPassword, checkEmail};