import { useState } from "react";
import "./App.css";
import TemaCard from "./components/Temacard.jsx";
import BodyQuiz from "./components/bodyQuiz.jsx";

function App() {

  const temas = [
    { nome: "Minecraft", imagem: "minecraft.png" },
    { nome: "Pokemon", imagem: "https://i.pinimg.com/originals/a9/42/ff/a942ffab4c8a80be2751d3bfaab9f96d.gif" },
    { nome: "digimon", imagem: "digimon.png" },
    { nome: "comida", imagem: "comida.png" },
    { nome: "Filmes", imagem: "https://i.pinimg.com/originals/ee/77/0f/ee770f48731f6b32ec1a3609c594981a.gif" },
    { nome: "Séries", imagem: "https://i.pinimg.com/1200x/39/37/47/393747d57d29232eaa98b9ecba7c4dca.jpg" },
    { nome: "Animes", imagem: "https://i.pinimg.com/736x/43/53/07/4353070dcf5836d3c4b5373f0a592d5e.jpg" },
    { nome: "Jogos", imagem: "https://i.pinimg.com/originals/02/79/24/02792408d2e99b4a100e81f9c900cb1a.gif" },
    { nome: "memes  BR", imagem: "https://i.pinimg.com/originals/9d/ad/bc/9dadbc7c182a7c883320bb1506333f68.gif" },
    { nome: "Programação", imagem: "https://i.pinimg.com/originals/7e/99/02/7e99020ea566ae9b31bed25f6b53a7d2.gif" },
    { nome: "Geografia", imagem: "https://i.pinimg.com/originals/e6/ed/1b/e6ed1bcf97af0790d6491445c0112221.gif" },
    { nome: "Tecnologia", imagem: "https://i.pinimg.com/originals/63/7a/4d/637a4d42e1738853b2f96ffbbd60622a.gif" }
  ];

  async function receberQuiz(tema) {
    setTemaAtual(tema);
    setLoading(true);
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
    } finally{
      setLoading(false);
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
  const [loading, setLoading] = useState(false);

  return (
    <div className="main">
      <div className="titulo">
        <div className="logo"></div>
        <h1>Quiz eu sabo muito</h1>
      </div>

      {!emQuiz && (
        <>
          
          {loading ? (
            <div style={{display:"grid", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", marginTop:"150px"}}>
            <div style={{display:"flex", width:"300px", justifyContent:"center", alignItems:"center"}}><div className="loader"></div></div>
            <h2 style={{width:"300px"}}>Gerando quiz com IA</h2>
            <p>Isso pode demorar um pouco.</p>
            </div>
          ) : (
            <div>
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
            </div></div>
          )}
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


