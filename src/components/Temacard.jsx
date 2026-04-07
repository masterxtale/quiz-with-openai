

function TemaCard({ nome, imagem, onClick }) {
  
    return (
    <div className="temas" onClick={onClick}>
      <div
        className="icone"
        style={{ backgroundImage: `url(${imagem})` }}
      ></div>
      <p className="nomeTema">{nome}</p>
    </div>
  );
}
export default TemaCard;