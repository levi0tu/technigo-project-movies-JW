import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;


    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Could not fetch movies");
                return res.json();
            })
            .then((data) => {
                setMovies(data.results);
                setLoading(false);
            })
            .catch(() => {
                setError("Something went wrong");
                setLoading(false);
            });
    }, [apiKey]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main className="movie-list">
            <div className="movie-grid">
                {movies.map((movie) => {
                    const posterurl = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;

                    return (
                        <Link className="movie-card" key={movie.id} to={`/movies/${movie.id}`}>
                            <img src={posterurl} alt={movie.title} />
                            <div className="movie-card-overlay">
                                <h1 className="movie-title">{movie.title}</h1>
                                <p className="movie-date">Released {movie.release_date}</p>
                            </div>
                        </Link>
                    );
                })};
            </div>
        </main>);
};

export default MovieList;
