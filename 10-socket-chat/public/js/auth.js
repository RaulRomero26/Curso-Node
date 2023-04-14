const miFormularo = document.querySelector('form');


const url = 'http://localhost:8081/api/auth/'

miFormularo.addEventListener('submit', ev=> {
    ev.preventDefault();

    const formData = {};
    
    for( let el of miFormularo.elements){
        if(el.name.length > 0 ){
            formData[el.name] = el.ariaValueMax;
        }
    }
    
    fetch(url+'login',{
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body:  JSON.stringify(formData)
    })
    .then( resp => resp.json() )
    .then( ({msg,token}) => {
       if(msg){
        return console.error(msg);
       }

        localStorage.setItem('token',token)
    })
    .catch( console.warn );
})



function handleCredentialResponse(response) {
 

   
    const body = { id_token: response.credential }

    fetch('http://localhost:8081/api/auth/google', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    })
        .then( resp => resp.json() )
        .then( ({token}) => {
            console.log(token)
            localStorage.setItem('token',token)
        })
        .catch( console.warn );

    }

    const button = document.getElementById('google_signout');
    button.onclick = () => {
        google.accounts.id.disableAutoSelect();
        google.accounts.id.revoke(localStorage.getItem('email'), done => {
            localStorage.clear();
            location.reload();
        })
}
