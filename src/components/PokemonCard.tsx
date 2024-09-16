import './styles/PokemonCard.css';

interface PokemonCardProps {
    index: number;
    name: string;
    url: string;
    handleClick: (name: string, id: number) => void;
}

const  PokemonCard :  React.FC<PokemonCardProps> = ({index, name, url, handleClick}) => {
    return (
        <div className="pokemon-card-container" onClick={() => handleClick(name, index)}>
            <div className="pokemon-image">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`} alt={name} />
            </div>
            <div className="pokemon-body">
                <div className="pokemon-name">{name}</div>
                <div className="pokemon-url">{url}</div>
            </div>
        </div>
    );
}
export default PokemonCard;