function GameCard({ game, buttonLabel = 'View Game', buttonHref = '#hero', showSubtitle = true }) {
  return (
    <article className="game-card game-card--grid">
      <div className="game-card__image" style={{ backgroundImage: `url(${game.image})` }} />
      <div className="game-card__content">
        <span className="game-card__genre">{game.genre || game.badge}</span>
        <h3>{game.title}</h3>
        {showSubtitle && game.subtitle && <p>{game.subtitle}</p>}
        <div className="game-card__footer">
          <strong>{game.price}</strong>
          <a className="game-card__button" href={buttonHref}>
            {buttonLabel}
          </a>
        </div>
      </div>
    </article>
  );
}

export default GameCard;
