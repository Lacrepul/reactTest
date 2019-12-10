export async function RegisterFetch(name, email, password, password_confirmation){
    let response = await fetch('register', {
        headers : 
        {'Content-Type': 'application/json',
        'Accept': 'application/json'},
        method: 'POST',
        body: JSON.stringify({name, email, password, password_confirmation})
    })
    if(response.status == 200){
        return '200';
    }else if(response.status == 500){
        return '500';
    }else{
        let result = await response.json();
        let results = [result['errors']['password'][0], result['errors']['password'][1]];
        return results;
    }
}
