import PokemonCard from "./PokemonCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonData } from "../redux/actions";
import { RootState } from "../redux/reducers/rootReducer";
import PokemonModal from "./PokemonModal";

const PokemonGrid = () => {
    const [open, setOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state: RootState) => state.pokemonData);
    
    useEffect(() => {
        if(isFirstPage){
            setIsFirstPage(false);
            dispatch(fetchPokemonData(currentPage))
        }
    }, []);
  

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        // console.log("e.currentTarget : ", scrollHeight, scrollTop, clientHeight);

        if (scrollHeight - scrollTop - clientHeight < 10 && !loading && !isFirstPage) {
            dispatch(fetchPokemonData(currentPage));
            setCurrentPage(currentPage+1);
        }
    };

    const handlePokemonClick = (name: string, id: number) => {
        // console.log("name - number : ", name, " - ", id);
        setSelectedPokemon(name);
        handleOpen();
    }

    return (
        <>
        <div id="list-container" style={{flex: 1, backgroundColor: "#444", overflow: 'auto', width: "100%", padding: "10px", borderRadius: "10px", maxWidth: "1000px", margin: "0 auto"}} onScroll={handleScroll}>
            {data.map((pokemon, index) => (
                <PokemonCard index={index + 1} name={pokemon.name} url={pokemon.url} handleClick={handlePokemonClick}  />
            ))}
            {loading && <p>Loading...</p>}
            {error && <p>Error loading data: {error}</p>}
        </div>
        <PokemonModal open={open} handleClose={handleClose} selectedPokemon={selectedPokemon}/>
        </>
    );
}

export default PokemonGrid;