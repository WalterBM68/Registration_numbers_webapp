module.exports = function regNumbers(){
    let errorsMessages = '';
    let validRegex = '/^([a-zA-Z0-9 _-]+)$/';
    const regExp2 = /^((CA|CF|CY|CJ)\s([0-9]){3}\-([0-9]){3})$/;

    function validateRegNumbers(numerPlates){
        if(numerPlates == ''){
            errorsMessages = 'Please enter the registration number';
        }else if(!numerPlates.match(validRegex)){
            errorsMessages = 'Enter reg number that starts with alphabets followed by numbers';
        }else if(!numerPlates.match(regExp2)){
            errorsMessages = 'Please enter a valid registration number format';
        }
    }

    function errorMessages(){
        return errorsMessages;
    }

    return{
        validateRegNumbers,
        errorMessages
    }
}


// const regExp1 = /^((CA|CF|CY|CJ)\s([0-9]){3}\s([0-9]){3})$/;