import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const MovieDetail = () => {
    const { id } = useParams();
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Could not fetch movie");
                return res.json();
            })
            .then((data) => {
                setMovie(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Something went wrong");
                setLoading(false);
            });
    }, [apiKey]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return null;

    const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "";
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "Unknown";
    return (
        <main className="movie-detail-page">
            <section className="hero" style={{ backgroundImage: `url(${backdropUrl})` }}>
                <img src={posterUrl} alt={movie.title} />
                <div>
                    <h1>{movie.title}</h1>
                    <p>{year} • {movie.runtime} min </p>
                </div></section></main>);
};

export default MovieDetail;