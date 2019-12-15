export function NoteDeleteFetch (product){
    let result = fetch( 'http://127.0.0.1:8000/api/products/' + product.id, 
                { method: 'delete' })
                .then(response => {
                    return response;
                })
                return result;
}