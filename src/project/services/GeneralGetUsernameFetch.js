export function GeneralGetUsernameFetch(){
    let username = fetch('username')
    .then(response => {
        return response.json();
    })
    return username;
}