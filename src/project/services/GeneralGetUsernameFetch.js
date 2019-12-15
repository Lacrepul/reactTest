export function GeneralGetUsernameFetch(){
    let username = fetch('http://127.0.0.1:8000/username',
    {headers : 
    {'Content-Type': 'application/json',
    'Accept': 'application/json'},
    credentials: "include"})
    .then(response => {
        return response.json();
    })
    return username;
}