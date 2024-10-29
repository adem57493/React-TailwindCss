export default function Articles({ articles, title, fallbackText, onSelectArticle }) {
  return (
    <section className="articles-category">
      <h2>{title}</h2>
      {articles.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {articles.length > 0 && (
        <ul className="articles">
          {articles.map((article, index) => (
            <li key={article.id || index} className="article-item">
              <button onClick={() => onSelectArticle(article.id)}>
                <h3>{article.title}</h3>
                <p>{article.content}</p> {}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
