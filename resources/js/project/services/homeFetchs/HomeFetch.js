export async function HomeFetch(email, password){
    let response = await fetch('login', {
        headers : 
        {'Content-Type': 'application/json',
        'Accept': 'application/json'},
        method: 'POST',
        body: JSON.stringify({email , password}),
    })
    if (response.status == 200){
        return "200";
    }else{
        let result = await response.json();
        return result['errors']['email'][0];
    }
}
