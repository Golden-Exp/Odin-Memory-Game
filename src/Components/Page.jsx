import { useEffect, useState } from "react";
import "../styles/Page.css"

function Page() {
    const [resetButton, reset] = useState(true)
    const [selectedPokemon, addPokemon] = useState([])
    function Card({ name, sprite }){
        const clickDiv = ({ name }) => {
            const Shuffled = [...PokemonList].sort( () => Math.random() - 0.5 )
            setPokemonList(Shuffled)
        }
        return (
            <div className="card" onClick={clickDiv(name)} >
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
            fetchedPokemon.push({name: PokeData.name.toUpperCase(), sprite:PokeData.sprites.front_default})
        }
        setPokemonList(fetchedPokemon)
    }
        func()
        return () => {
            setPokemonList([])
        };
    }, [resetButton])

    const clickReset = () => {
        reset(!resetButton)
    }

    return (
        <>
        <div className="page">
            {PokemonList.map((pokemon, index) => (
                <Card key={pokemon.name} name={pokemon.name} sprite={pokemon.sprite} />
            ))}
        </div>
        <div className="right">
            <h3>Top Score: </h3>
            <h3>Current Score: </h3>
            <button onClick={clickReset}>Reset</button>
        </div>
        </>
    )
}

export default Page