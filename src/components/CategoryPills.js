function CategoryPills({ items }) {
  return (
    <div className="category-pills">
      {items.map((item) => (
        <a key={item} className="category-pill" href="#recommendations">
          {item}
        </a>
      ))}
    </div>
  );
}

export default CategoryPills;
