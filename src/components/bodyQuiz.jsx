import { useState } from "react";

function BodyQuiz({ quiz, onProximaPergunta, historico, onVoltar }) {
  const [mensagem, setMensagem] = useState("");
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);

  // Correção: só chama onVoltar quando realmente completar as 10 perguntas
  if (historico.length >= 10) {
    onVoltar();
    return null;
  }

  function Verificar(alternativaClicada) {
    if (respostaSelecionada) return;

    setRespostaSelecionada(alternativaClicada);

    const estaCorreta = alternativaClicada === quiz.resposta;
    setMensagem(estaCorreta ? "CORRETO" : "ERRADO");

    setTimeout(() => {
      setMensagem("");
      setRespostaSelecionada(null);
      onProximaPergunta();
    }, 1800);
  }

  return (
    <div className="geral">
        <div className="informacoes">
          Pergunta {historico.length + 1} de 10
        </div>

        <div className="conteudoQuiz">
          {mensagem && (
            <div className={`mensagem ${mensagem === "CORRETO" ? "correto" : "errado"}`}>
              {mensagem}
            </div>
          )}

          <div className="textoQuiz">
            {quiz.pergunta}
          </div>
        </div>

        <div className="alternativas">
          {quiz.alternativas.map((alternativa, index) => {
            const isSelected = respostaSelecionada === alternativa;
            const isCorrect = alternativa === quiz.resposta;

            return (
              <div
                key={index}
                className={`alternativa 
                  ${isSelected && isCorrect ? 'correta' : ''}
                  ${isSelected && !isCorrect ? 'errada' : ''}`}
                onClick={() => Verificar(alternativa)}
              >
                {alternativa}
              </div>
            );
          })}
        </div>
    </div>
  );
}

export default BodyQuiz;