import { useContext, useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { SideBar } from "./SideBar";
import { api } from '.././services/api';
import '../styles/content.scss';
import { Sidebar } from "react-feather";

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content(props) {
  // Complete aqui
  
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {

    api.get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [props.selectedGenreId]);

  return (

    <div className="container">
      <header>
        <span className="category">Categoria: <span> {props.selectedGenre.title} </span>  </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>


  )
}