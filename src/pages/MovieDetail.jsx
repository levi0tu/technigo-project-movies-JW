import React from "react";
import { useParams } from "react-router-dom";



const MovieDetail = () => {
    const { id } = useParams();

    return <h1>Detail{id}</h1>
};

export default MovieDetail;