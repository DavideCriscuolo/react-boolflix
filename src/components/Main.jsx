import StarRatings from "react-star-ratings"; // libreria per le stelline
import Flag from "react-world-flags"; // libreria per le bandiere
import { useState } from "react";

export default function Main() {
  const api_key = import.meta.env.VITE_API_KEY;
  const [nameFilm, setNameFilm] = useState("");
  const [film, setFilm] = useState([]);

  const [serTv, setSerTv] = useState([]);
  const [nameTv, setNameTv] = useState("");
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${nameFilm}`;

  const urlTv = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${nameTv}`;

  function handleChange(e) {
    setNameFilm(e.target.value);
    console.log(nameFilm);
    setNameTv(e.target.value);
    console.log(serTv);
  }

  function gnrFilmStv(e) {
    e.preventDefault();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setFilm(data.results);
      });

    fetch(urlTv)
      .then((res) => res.json())
      .then((data) => {
        setSerTv(data.results);
      });
  }

  return (
    <>
      <main>
        <div className="container p-5">
          <form onSubmit={gnrFilmStv} action="">
            <label className="form-label" htmlFor="">
              Cerca Film
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              value={(nameFilm, nameTv)}
              type="text"
            />
            <button className="btn btn-outline-success my-2" type="submit">
              Cerca
            </button>
          </form>
        </div>
        <div className="row row-cols-6 p-5">
          {film.map((film) => {
            return (
              <div key={film.id} className="col p-5 ">
                <div className="card h-100">
                  <img
                    className="card-img-top ratio ratio-1x1"
                    src={`https://image.tmdb.org/t/p/w342/${film.poster_path}`}
                    alt="image Film"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{film.original_title}</h4>
                    <p className="card-text">
                      Titolo Originale: {film.original_title}
                    </p>
                    <Flag
                      code={film.original_language.toUpperCase()}
                      style={{ width: 30, height: 20 }}
                    ></Flag>
                    <p> Lingua: {film.original_language.toUpperCase()}</p>
                    <StarRatings
                      numberOfStars={5}
                      rating={Math.round(film.vote_average / 2)} //per arrotondare e non avere mezze stelle
                      starRatedColor="gold"
                      starDimension="24px"
                      starSpacing="2px"
                      name="rating"
                    >
                      Voto:
                    </StarRatings>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h1>Serie TV </h1>
          <div className="row row-cols-6 p-5">
            {serTv.map((stv) => {
              return (
                <div key={stv.id} className="col p-5 ">
                  <div className="card h-100">
                    <img
                      className="card-img-top ratio ratio-1x1"
                      src={`https://image.tmdb.org/t/p/w342/${stv.poster_path}`}
                      alt="image Film"
                    />
                    <div className="card-body">
                      <h4 className="card-title">{stv.name}</h4>
                      <Flag
                        code={stv.original_language.toUpperCase()}
                        style={{ width: 30, height: 20 }}
                      ></Flag>
                      <p> Lingua: {stv.original_language.toUpperCase()}</p>
                      <StarRatings
                        numberOfStars={5}
                        rating={Math.round(stv.vote_average / 2)} //per arrotondare e non avere mezze stelle
                        starRatedColor="gold"
                        starDimension="24px"
                        starSpacing="2px"
                        name="rating"
                      >
                        Voto:
                      </StarRatings>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
