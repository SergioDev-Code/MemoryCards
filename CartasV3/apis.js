async function dataCountriesApi(){
    let apiUrl = 'https://restcountries.com/v3.1/region/americas?fields=name,flags'; 
    const response = await fetch(apiUrl)
    .then(function(response) {
        if (!response.ok) {
            throw new Error('La solicitud no tuvo éxito');
        }
        return response.json();
    })
    .then(function(data) {
        
        return data
    })

    return response
}

export { dataCountriesApi };