export function NoteAddProductFetch (product){
    let result = fetch( 'api/products/', {
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