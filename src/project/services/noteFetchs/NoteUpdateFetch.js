export async function NoteUpdateFetch(currentProduct, product){
    let response = await fetch('http://127.0.0.1:8000/api/products/' + currentProduct.id, {
        headers : 
        {'Content-Type': 'application/json',
        'Accept': 'application/json'},
        method: 'PUT',
        body: JSON.stringify(product),
    })
    return response.json();
}