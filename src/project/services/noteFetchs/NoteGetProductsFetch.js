export function NoteGetProductsFetch(){
    let result = fetch('http://127.0.0.1:8000//api/products')
    .then(response => {
        return response.json();
    })
    return result;
}