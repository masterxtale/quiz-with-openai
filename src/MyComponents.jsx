

function TemaCard({ nome, imagem }) {
  
    return (
    <div className="temas">
      <div
        className="icone"
        style={{ backgroundImage: `url(${imagem})` }}
      ></div>
      <p className="nomeTema">{nome}</p>
    </div>
  );
}

export default TemaCard;