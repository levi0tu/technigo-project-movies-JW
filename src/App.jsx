import React from "react";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movies/:id" element={<MovieDetail />} />

    </Routes>
  );
};

