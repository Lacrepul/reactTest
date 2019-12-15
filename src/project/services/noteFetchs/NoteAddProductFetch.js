export function NoteAddProductFetch (product){
    let result = fetch( 'http://127.0.0.1:8000/api/products/', {
        method:'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
    return result;
}