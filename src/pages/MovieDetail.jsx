import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const MovieDetail = () => {
    const { id } = useParams();
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const [movie, setMovie] = useState([null]);
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
    }, [id, apiKey]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return null;

    const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
        : "";
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "Unknown";
    return (
        <main className="movie-detail-page">
            <section className="hero" style={{ backgroundImage: `url(${backdropUrl})` }}>
                <div className="hero-darken" />
                <div className="hero-fade-bottom" />

                <a href="/" className="back-link">
                    <span className="back-circle">
                        <span className="back-icon">◀</span></span> Movies</a>

                <div className="hero-content">
                    <img className="detail-poster" src={posterUrl} alt={movie.title} />

                    <div className="detail-info">
                        <h1>{movie.title}</h1>
                        <span className="rating">
                            <span className="star">★</span> {movie.vote_average?.toFixed(1)}</span>
                        <p className="movie-text">{movie.overview}</p>
                    </div></div></section></main>);
};

export default MovieDetail;