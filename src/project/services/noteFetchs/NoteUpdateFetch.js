export async function NoteUpdateFetch(currentProduct, product){
    let response = await fetch('api/products/' + currentProduct.id, {
        headers : 
        {'Content-Type': 'application/json',
        'Accept': 'application/json'},
        method: 'PUT',
        body: JSON.stringify(product),
    })
    return response.json();
}