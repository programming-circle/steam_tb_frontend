import GameCard from './GameCard';

function HorizontalScroller({ items }) {
  return (
    <div className="scroll-row featured-strip">
      {items.map((item) => (
        <GameCard key={item.title} game={item} showSubtitle={false} />
      ))}
    </div>
  );
}

export default HorizontalScroller;
