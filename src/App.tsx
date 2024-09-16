import PokemonGrid from "./components/PokemonGrid";

function App() {
  return (
    <div style={{padding: "10px", display: "flex", flexDirection: "column", height: "100vh"}}>
      <div style={{padding: "20px 0 0 0"}}>
        <h1>Imedia24 Pokemon API Consumer</h1>
      </div>
      <PokemonGrid/>
    </div>
  )
}

export default App
