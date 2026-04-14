import { Link } from 'react-router-dom';

function CategoryPills({ items }) {
  return (
    <div className="category-pills">
      {items.map((item) => (
        <Link key={item} className="category-pill" to="/library">
          {item}
        </Link>
      ))}
    </div>
  );
}

export default CategoryPills;
