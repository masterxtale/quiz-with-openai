import { useState } from "react";
import "./App.css";
import TemaCard from "./components/Temacard.jsx";
import BodyQuiz from "./components/bodyQuiz.jsx";


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

  async function receberQuiz(tema) {
    setTemaAtual(tema)
    const resposta = await fetch("http://localhost:3001/quiz" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tema })
    });
    const data = await resposta.json();
    setQuiz(data);
    
  }

  function proximaPergunta(){
    if (temaAtual) {
    receberQuiz(temaAtual);   // busca outra pergunta do mesmo tema
  }
  };
  
  const [quiz, setQuiz] = useState(null);
  const [temaAtual, setTemaAtual] = useState("");

  return (
    <div className="main">
      <div className="titulo">
        <div className = "logo"></div>
        <h1>Quiz eu sabo muito</h1>
      </div>
      <>
        <h2>Escolha um tema</h2>

        {!quiz &&
        <div className="gridTemas">
          {temas.map((tema) => (
            <TemaCard onClick={() => receberQuiz(tema.nome.toLowerCase())} nome={tema.nome} imagem={tema.imagem} />
          ))}
        </div>}

        <div className="bodyQuiz">
          {quiz && (
          <div className="resultado">
            <BodyQuiz quiz={quiz} onProximaPergunta={proximaPergunta}/>
          </div>
          )}          
        </div>
      </>


    </div>


  );
}


export default App;


