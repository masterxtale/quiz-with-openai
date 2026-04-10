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
    setTemaAtual(tema);
    try {
      const resposta = await fetch("https://backend-quiz-with-openai.onrender.com/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema })
      });
      const data = await resposta.json();
      setQuiz(data);
      setEmQuiz(true);
    } catch (error) {
      console.error("Erro ao buscar quiz:", error);
    }
  }

  function proximaPergunta() {
    // Adiciona a pergunta atual ao histórico ANTES de buscar a próxima
    setHistorico(prev => [...prev, quiz]);

    // Só busca próxima pergunta se ainda não completou 10
    if (historico.length + 1 < 10) {
      if (temaAtual) {
        receberQuiz(temaAtual);
      }
    }
  }

  function voltar() {
    setEmQuiz(false);
    setQuiz(null);
    setHistorico([]);
  }

  const [quiz, setQuiz] = useState(null);
  const [temaAtual, setTemaAtual] = useState("");
  const [historico, setHistorico] = useState([]);
  const [emQuiz, setEmQuiz] = useState(false);

  return (
    <div className="main">
      <div className="titulo">
        <div className="logo"></div>
        <h1>Quiz eu sabo muito</h1>
      </div>

      {!emQuiz && (
        <>
          <h2>Escolha um tema</h2>
          <div className="gridTemas">
            {temas.map((tema) => (
              <TemaCard 
                key={tema.nome}
                onClick={() => receberQuiz(tema.nome.toLowerCase())} 
                nome={tema.nome} 
                imagem={tema.imagem} 
              />
            ))}
          </div>
        </>
      )}

      {emQuiz && quiz && (
        <BodyQuiz 
          quiz={quiz} 
          onProximaPergunta={proximaPergunta} 
          historico={historico} 
          onVoltar={voltar}
        />
      )}
    </div>
  );
}

export default App;