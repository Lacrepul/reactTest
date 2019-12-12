export async function HomeFetch(email, password){
    let response = await fetch('http://127.0.0.1:8000/login', {
        headers : 
        {'Content-Type': 'application/json',
        'Accept': 'application/json'},
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify({email , password}),
    })
    if (response.status == 200){
        return "200";
    }/*else{
        let result = await response.json()
        return result['errors']['email'][0];
    }*/
}
