const pokemonLista = document.getElementById('pokemonLista');
const loadmorebutton=document.getElementById('loadMoreButton')
const limit=6
let offset=0
const maxrecords=151

function loadmorepokemon(offset, limit) {
    pokeapi.getpokemons(offset, limit).then((pokemons = []) => {
        // Clear existing HTML content
        pokemonLista.innerHTML = '';

        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#0${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('');
        pokemonLista.innerHTML += newHtml;
    });
}


loadmorepokemon(offset,limit)

loadmorebutton.addEventListener('click', () => {
    offset += limit;
    const qtdrecords=offset+limit
    if (qtdrecords >= maxrecords) {
        const newlimit = maxrecords - offset;
        loadmorepokemon(offset, newlimit);
        loadmorebutton.parentElement.removeChild(loadmorebutton);
    } else {
        loadmorepokemon(offset, limit);
    }
})

