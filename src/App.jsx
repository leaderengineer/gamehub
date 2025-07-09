import React, { useEffect, useState } from "react";
import "./App.css"; // CSS ni chaqirish

const App = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [loading, setLoading] = useState(true);

  console.log(games);

  useEffect(() => {
    fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "1d5745cfd3msh305cfe293b91cc8p162fe5jsn6fc8890db28c",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, []);

  const genres = ["All", ...new Set(games.map((g) => g.genre))];

  const filtered = games.filter((g) => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === "All" || g.genre === genre;
    return matchSearch && matchGenre;
  });

  return (
    <div>
      <h1>🎮 GameHub</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="select-genre"
        >
          {genres.map((g, idx) => (
            <option key={idx}>{g}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading">⏳ Loading...</p>
      ) : (
        <div className="grid-container">
          {filtered.map((game) => (
            <div key={game.id} className="card">
              <img src={game.thumbnail} alt={game.title} />
              <h3>{game.title}</h3>
              <p>
                <strong>🎮 Genre:</strong> {game.genre}
              </p>
              <p>
                <strong>🖥 Platform:</strong> {game.platform}
              </p>
              <a href={game.game_url} target="_blank" rel="noreferrer">
                🔗 Play Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
