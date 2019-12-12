export function NoteGetProductsFetch(){
    let result = fetch('/api/products')
    .then(response => {
        return response.json();
    })
    return result;
}