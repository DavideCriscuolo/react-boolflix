/*  Creare un layout base con una searchbar (una input e un button) in cui possiamo 
scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  
bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. 
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni 
film trovato:  
1.  Titolo 
2.  Titolo Originale 
3.  Lingua 
4.  Voto  


Milestone 2: 
Trasformiamo la stringa statica della lingua in una vera e propria bandiera della 
nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della 
nazione ritornata dall’API (le flag non ci sono in FontAwesome). 
 
Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca 
dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando 
attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di 
risposta diversi, simili ma non sempre identici) 
Qui un esempio di chiamata per le serie tv: 
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=s
crubs 
 



*/
import Flag from "react-world-flags"; // per le bandiere
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

      {film.map((film) => {
        return (
          <ul key={film.id}>
            <li>Titolo: {film.title} </li>
            <li> Titolo Originale:{film.original_title}</li>{" "}
            <Flag
              code={film.original_language.toUpperCase()}
              style={{ width: 30, height: 20 }}
            ></Flag>
            <li>Voto: {film.vote_average}</li>
          </ul>
        );
      })}
    </>
  );
}

export default App;
