export async function HomeFetch(email, password){
    let response = await fetch('login', {
    headers : 
    {'Content-Type': 'application/json',
    'Accept': 'application/json'},
    method: 'POST',
    body: JSON.stringify({email , password}),
    })
    return response;
}
