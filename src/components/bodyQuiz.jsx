import { useState } from "react";

function BodyQuiz({ quiz, onProximaPergunta }) {

  const [mensagem, setMensagem] = useState("");

  // Função que verifica a resposta
  function Verificar(alternativaClicada) {
    if (alternativaClicada === quiz.resposta) {
      setMensagem("CORRETO")
    } else {
      setMensagem("ERRADO")
    }
    setTimeout( ()=> {onProximaPergunta();}, 2000);
  }

  return (
    <div className="geral">
      <div className="informacoes"></div>
      <div className="conteudoQuiz">
        
        <div className="textoQuiz">
          {quiz.pergunta}
        
          {mensagem && (
            <div className="mensagem">
              {mensagem}
            </div>
          )}
        
        
        
        </div>

        <div className="alternativas">
          {quiz.alternativas.map((alternativa, index) => (
            <div 
              key={index} 
              className="alternativa"
              onClick={() => Verificar(alternativa)}   // ← Correto!
            >
              {alternativa}
            </div>
          ))}
        </div>

      </div>

      
    </div>
  );
}

export default BodyQuiz;