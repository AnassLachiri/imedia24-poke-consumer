import { styled, css } from '@mui/system';
import React, { useEffect, useState } from "react";
import { Modal as BaseModal } from '@mui/material';
import clsx from 'clsx';
import { fetchPokemonDetails, GetPokemonDetailsResponse } from '../api/pokemonApi';

interface PokemonModalProps {
    open: boolean;
    handleClose: () => void;
    selectedPokemon: string;
}

const PokemonModal: React.FC<PokemonModalProps> = ({open, handleClose, selectedPokemon}) => {
    const [pokemonDetails, setPokemonDetails] = useState<GetPokemonDetailsResponse | null>(null);
    useEffect(() => {
        if(selectedPokemon !== null && selectedPokemon !== "")
        fetchPokemonDetails(selectedPokemon)
            .then(data => setPokemonDetails(data));
    }, [selectedPokemon]);
    return (
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
        >
            <ModalContent sx={{ width: 600 }}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails?.id}.png`} alt={selectedPokemon} />
                <h2 id="unstyled-modal-title" className="modal-title">
                    Name : {selectedPokemon}
                </h2>
                <p id="unstyled-modal-description" className="modal-description">
                    <strong>Id:</strong> {pokemonDetails?.id} 
                    <strong> - Height:</strong> {pokemonDetails?.height} 
                    <strong> - Weight:</strong> {pokemonDetails?.weight} 
                    <strong> - Base experience:</strong> {pokemonDetails?.base_experience} 
                </p>
                <div>
                    <h4>Other sprites:</h4>
                    <div className='modal-sprites'> 
                    <img src={pokemonDetails?.sprites.other.dream_world.front_default} alt={selectedPokemon} /> 
                    <img src={pokemonDetails?.sprites.other.home.front_default} alt={selectedPokemon} /> 
                    <img src={pokemonDetails?.sprites.other.home.front_shiny} alt={selectedPokemon} /> 
                    <img src={pokemonDetails?.sprites.other['official-artwork'].front_default} alt={selectedPokemon} /> 
                    <img src={pokemonDetails?.sprites.other['official-artwork'].front_shiny} alt={selectedPokemon} /> 
                    <img src={pokemonDetails?.sprites.back_default} alt={selectedPokemon} /> 
                    <img src={pokemonDetails?.sprites.back_shiny} alt={selectedPokemon} /> 
                    <img src={pokemonDetails?.sprites.front_default} alt={selectedPokemon} /> 
                    <img src={pokemonDetails?.sprites.front_shiny} alt={selectedPokemon} />
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}


const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
      text-align: center;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
      text-align: center;
    }

    & .modal-sprites {
        display: flex;
        flexDirection: row;
        gap: 10px;
        overflow: auto;
        height: 100px;
    }
  `,    
);

export default PokemonModal;