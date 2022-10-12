
document.addEventListener('DOMContentLoaded', function(){
    let errorMsg = document.querySelector('.message');
    if(errorMsg.innerHTML !== ''){
        setTimeout(function(){
            errorMsg.innerHTML = '';
        }, 4000);
    }
});

document.addEventListener('DOMContentLoaded', function(){
    let filteringError = document.querySelector('.handlebarsError');
    if(filteringError.innerHTML !== ''){
        setTimeout(function(){
            filteringError.innerHTML = '';
        }, 4000);
    }
});