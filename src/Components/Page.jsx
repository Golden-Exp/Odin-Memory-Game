import { useEffect, useState } from "react";
import "../styles/Page.css"

function Page() {
    const [resetButton, reset] = useState(true)
    const [selectedPokemon, addPokemon] = useState([])
    const [score, setScore] = useState(0)
    const [topScore, setTopScore] = useState(0)
    const [loading, setLoading] = useState(true)
    const [isPopUp, setPopUp] = useState(false)
    const [status, setStatus] = useState("")
    const clickDiv = (name) => {
        const Shuffled = [...PokemonList].sort( () => Math.random() - 0.5 )
        setPokemonList(Shuffled)
        if (selectedPokemon.some(p => p === name)){
            setTopScore(Math.max(score, topScore))
            setStatus("lost")
            setPopUp(true)
        }
        else if (selectedPokemon.length === 11) {
            setTopScore(12)
            setScore(score + 1)
            setStatus("won")
            setPopUp(true)
        }
        else {
            addPokemon([...selectedPokemon, name])
            setScore(score + 1)
        }
    }
    function Card({ name, sprite }){
        return (
            <div className="card" onClick={() => clickDiv(name)} >
                <img src={sprite} />
                <h3>{name}</h3>
            </div>
        )
    }
    const [PokemonList, setPokemonList] = useState([])

    useEffect(() => {
        async function func(){
        const fetchedPokemon = []
        while(fetchedPokemon.length < 12){
            const num = Math.floor(Math.random()* 800) + 1;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
            const PokeData = await response.json();
            if (fetchedPokemon.some(p => p.name === PokeData.name)){
                continue
            }
            fetchedPokemon.push({name: PokeData.name.toUpperCase(), sprite:PokeData.sprites.other.showdown.front_default})
        }
        setPokemonList(fetchedPokemon)
        setLoading(false)
    }
        func()
        return () => {
            setPokemonList([])
        };
    }, [resetButton])

    const clickReset = () => {
        reset(!resetButton)
        setLoading(true)
        setPokemonList([])
        addPokemon([])
    }

    if (loading) {
        return (
        <div className="Loading" >
            <img src="/pokeball.png" height={100} width={100} />
        </div>
        )
    }

    const clickPopup = () => {
        reset(!resetButton)
        setLoading(true)
        setScore(0)
        addPokemon([])
        setPopUp(false)
    }

    return (
        <>
        {isPopUp && (
            <div className="popup">
                <div className="window" >
                    <h1>You {status}!!</h1>
                    <h2>Score: {score}</h2>
                    <button onClick={clickPopup} >Reset</button>
                </div>
            </div>
        )}
        <div className="page">
            {PokemonList.map((pokemon, index) => (
                <Card key={pokemon.name} name={pokemon.name} sprite={pokemon.sprite} />
            ))}
        </div>
        <div className="right">
            <h2>Top Score: {topScore}</h2>
            <h2>Current Score: {score}</h2>
            <button onClick={clickReset}>Reset</button>
        </div>
        </>
    )
}

export default Page