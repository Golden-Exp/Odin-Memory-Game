import { useEffect, useState } from "react";
import "../styles/Page.css"

function Page() {
    function Card({ name, sprite }){
        const clickDiv = () => {
            const Shuffled = [...PokemonList].sort( () => Math.random() - 0.5 )
            setPokemonList(Shuffled)
        }
        return (
            <div className="card" onClick={clickDiv} >
                <img src={sprite} height={150} width={150}/>
                <h3>{name}</h3>
            </div>
        )
    }
    const [PokemonList, setPokemonList] = useState([])

    useEffect(() => {
        async function func(){
        const fetchedPokemon = []
        while(fetchedPokemon.length < 12){
            const num = Math.floor(Math.random()* 1024) + 1;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
            const PokeData = await response.json();
            if (fetchedPokemon.some(p => p.name === PokeData.name)){
                continue
            }
            fetchedPokemon.push({name: PokeData.name, sprite:PokeData.sprites.front_default})
        }
        setPokemonList(fetchedPokemon)
    }
        func()
        return () => {
            setPokemonList([])
        };
    }, [])

    return (
        <div className="page">
            {PokemonList.map((pokemon, index) => (
                <Card key={index} name={pokemon.name} sprite={pokemon.sprite} />
            ))}
        </div>
    )
}

export default Page