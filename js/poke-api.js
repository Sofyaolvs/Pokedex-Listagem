const pokeapi = {}


function convertpokeapidetail(pokedetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokedetail.id;
    pokemon.name = pokedetail.name;

    const types = pokedetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.types = types;
    pokemon.type = types.join(', '); // Join multiple types into a single string

    pokemon.photo = pokedetail.sprites.other.dream_world.front_default;

    return pokemon;
}


pokeapi.getpokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertpokeapidetail)
}

pokeapi.getpokemons = (offset = 0, limit = 6) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then(response => response.json())
        .then(jsonbody => jsonbody.results)
        .then(pokemons => pokemons.map(pokeapi.getpokemonsDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetail) => pokemonsDetail);
        

}



/* parte para rever dps 
function convertpokeapidetail(pokedetail){
    const pokemon= new Pokemon()
    pokemon.number=pokedetail.id
    pokemon.name=pokedetail.name

    const types = pokedetail.types.map((typeSlot) => typeSlot.type.name);
const[type]=types
    pokemon.types=types
    pokemon.type=types

    pokemon.photo=pokedetail.sprites.other.dream_world.front_default

    return pokemon

}*/











/*const pokeapi = {};

pokeapi.getpokemonsDetail=(pokemon)=>{
    fetch(pokemon.url).then((response) => response.json())
}

pokeapi.getpokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then(response => response.json())
        .then(jsonbody => jsonbody.results)
        .then(pokemons => pokemons.map(pokeapi.getpokemonsDetail))
        .then((detailRequest)=>Promise.all(detailRequest))
        .then((pokemonsDetail)=>{
            debugger
            console.log(pokemonsDetail)
        })
}
 
*/
