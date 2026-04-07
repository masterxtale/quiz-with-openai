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
    const resposta = await fetch("http://localhost:3001/quiz" , {
      method: "POST",
      headers: {
        "content-type": "application/JSON"
      },
      body: JSON.stringify({ tema })
    });
    const data = await resposta.json();
    setQuiz(data);

    const gTemas = document.querySelector(".gridTemas");
    gTemas.style.display = "none";
  }
  
  const [quiz, setQuiz] = useState(null);

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
            <TemaCard onClick={() => receberQuiz(tema.nome.toLowerCase())} nome={tema.nome} imagem={tema.imagem} />
          ))}

        </div>
        <div className="bodyQuiz">

          {quiz && (
          <div className="resultado">
            <p>{quiz.mensagem}</p>
            <BodyQuiz/>
          </div>
          )}
          
        </div>
      </>
    </div>

  );
}
export default App;
