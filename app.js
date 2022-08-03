const baseUrl=' https://pokeapi.co/api/v2/pokemon/'
const pokemon=document.getElementById('pokemonName')
const buscar=document.getElementById('buscarPokemon') // la imagen de la lupa funcionara como un boton para buscar los pokemones
const borrar=document.getElementById('borrarPokemon') // la imagen de la x funcionara como un boton para borrar el nombre del pokemon
const appNode=document.getElementById('app') // en la etiqueta section con el id app se van a insertar el resuñtado de busqueda de los pokemones

buscar.addEventListener('click', insertarPokemon) // aqui a la imagen de la lupa le agrego una funcion mediante el metodo addEventListener usando un click
buscar.addEventListener('touchstart', insertarPokemon) // esto funciona para dispositivos moviles en vez de dar click solo tocara la pantalla

borrar.addEventListener('click', borrarPokemon)
borrar.addEventListener('touchstart', borrarPokemon)

function insertarPokemon(){
    window.fetch(`${baseUrl}${pokemon.value.toLowerCase()}`) // el window.fetch lo que hace es realizar una peticiona una pagina web (api) y trae devuelta un resultado
    .then(response =>{
        if(response.status===404){
            alert("Este pokemon no existe vuelve a intentarlo")
        } else{
            return response.json()
        }
    })
    .then(responseJSON =>{
        const allItems=[]
        const result=[]

        for(let pokemonInfo in responseJSON){
            result.push([pokemonInfo, responseJSON[pokemonInfo]])
        }
       

        // Imagen del pokemon buscado
        const pokemonImg=document.createElement('img')
        pokemonImg.src=result[14][1].front_default

        //Nombre de Pokemon o Id
        const pokemonName=document.createElement('h2')
        pokemonName.innerText = `Nombre: ${result[10][1]} - ID: ${result[6][1]}`;
        
        // Tipo de Pokemon
        const pokemonType=document.createElement('h2')
        pokemonType.innerText = `Tipo: ${result[16][1][0].type.name}`;

        //* Pokemon HP
        const hp = document.createElement('p');
        hp.innerText = `HP: ${result[15][1][0].base_stat}`; //*HP of pokemon
        hp.classList.add('pokemonStats')

        //* Poder de Ataque
        const attack = document.createElement('p');
        attack.innerText = `Ataque: ${result[15][1][1].base_stat}`; //* Attack power of pokemon
        attack.classList.add('pokemonStats');

        //* Defensa
        const defense = document.createElement('p');
        defense.innerText = `Defensa: ${result[15][1][2].base_stat}`; //* Pokemon defense
        defense.classList.add('pokemonStats');

        //* Ataque Especial
        const specialAttack = document.createElement('p');
        specialAttack.innerText = `Ataque Especial: ${result[15][1][3].base_stat}`; //* Pokemon special attack
        specialAttack.classList.add('pokemonStats');

        //* Defensa Especial
        const specialDefense = document.createElement('p');
        specialDefense.innerText = `Defensa Especial: ${result[15][1][4].base_stat}`; //* Pokemon special defense
        specialDefense.classList.add('pokemonStats');

        //* Velocidad
        const speed = document.createElement('p');
        speed.innerText = `Velocidad: ${result[15][1][5].base_stat}`; //* Pokemon special attack
        speed.classList.add('pokemonStats');

        //* Contenedor de los valores del pokemon
        const stats = document.createElement('div');
        stats.append(hp, attack, defense, specialAttack, specialDefense, speed);
        stats.classList.add('pokemonStatsContainer');
    
        //Contenedor que tendra toda la informacion del pokemon
        const container=document.createElement('div')
        container.append(pokemonImg, pokemonName, pokemonType, stats)
        container.classList.add('container');

        allItems.push(container)
        appNode.append(...allItems)
    })
}

function borrarPokemon(){ 
    let allPokemon=appNode.childNodes
    allPokemon=Array.from(allPokemon)

    allPokemon.forEach(pokemon=>{
        pokemon.remove(pokemon)
    })
}