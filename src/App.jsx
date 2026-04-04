import { useState } from "react";
import "./App.css";
import TemaCard from "./MyComponents.jsx";


function App() {

  const temas = [
    { nome: "Minecraft", imagem: "public/minecraft.png" },
    { nome: "História", imagem: "" },
    { nome: "Geografia", imagem: "" },
    { nome: "Programação", imagem: "" },
    { nome: "Filmes", imagem: "" },
    { nome: "Séries", imagem: "" },
    { nome: "Animes", imagem: "" },
    { nome: "Jogos", imagem: "" },
    { nome: "Esportes", imagem: "" },
    { nome: "Ciência", imagem: "" },
    { nome: "Tecnologia", imagem: "" },
    { nome: "Curiosidades", imagem: "" }
  ];


  return (
    <div className="main">
      <div className="titulo">
        <div className = "logo"></div>
        <h1>Quiz eu sabo muito</h1>
      </div>
      <>
        <h2>Escolha um tema</h2>

        <div className="gridTemas">

          {temas.map((tema) => (
            <TemaCard nome={tema.nome} imagem={tema.imagem} />
          ))}

        </div>
      </>
    </div>

  );
}
export default App;
