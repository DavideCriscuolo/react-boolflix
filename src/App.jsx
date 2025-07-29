/*  Creare un layout base con una searchbar (una input e un button) in cui possiamo 
scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  
bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. 
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni 
film trovato:  
1.  Titolo 
2.  Titolo Originale 
3.  Lingua 
4.  Voto  */

import axios from "axios";
import { use, useEffect, useState } from "react";

function App() {
  const api_key = import.meta.env.VITE_API_KEY;
  const [nameFilm, setNameFilm] = useState("");
  const [film, setFilm] = useState([]);

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${nameFilm}`;

  function handleChange(e) {
    setNameFilm(e.target.value);
    console.log(nameFilm);
  }

  function gnrFilm(e) {
    e.preventDefault();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setFilm(data.results);
      });
  }
  // useEffect(gnrFilm, []);

  return (
    <>
      <form onSubmit={gnrFilm} action="">
        <input onChange={handleChange} value={nameFilm} type="text" />
        <button type="submit">Cerca</button>
      </form>

      <ul>
        {film.map((film) => {
          return <li key={film.id}>{film.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
