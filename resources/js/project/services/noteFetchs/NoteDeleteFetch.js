export function NoteDeleteFetch (product){
    let result = fetch( 'api/products/' + product.id, 
                { method: 'delete' })
                .then(response => {
                    return response;
                })
                return result;
}