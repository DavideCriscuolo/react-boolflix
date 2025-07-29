import StarRatings from "react-star-ratings"; // libreria per le stelline
import Flag from "react-world-flags"; // libreria per le bandiere
import { useState } from "react";
import HeaderC from "./HeaderC";
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
      <HeaderC
        handleChange={handleChange}
        gnrFilmStv={gnrFilmStv}
        nameFilm={nameFilm}
        nameTv={nameTv}
      ></HeaderC>
      <main>
        <div className="container p-5"></div>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-row-cols-xxl-6 p-5">
          {film.map((film) => {
            return (
              <div key={film.id} className="col p-5 ">
                <h4>Film</h4>
                <div className="card mb-3 h-100 p-3 justify-content-center">
                  <div className="row g-0">
                    <div className="col-md-6">
                      <img
                        src={`https://image.tmdb.org/t/p/w342/${film.poster_path}`}
                        className="img-fluid rounded"
                        alt="Card title"
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">{film.original_title}</h5>
                        <p className="card-text">
                          Titolo Originale: {film.original_title}
                        </p>
                        <p className="card-text">
                          <Flag
                            code={film.original_language.toUpperCase()}
                            style={{ width: 30, height: 20 }}
                          ></Flag>
                        </p>
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
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className=" row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-row-cols-xxl-6 p-5">
            {serTv.map((stv) => {
              return (
                <div key={stv.id} className="col p-5 ">
                  <h4>Serie TV </h4>
                  <div className="card mb-3 h-100 p-3 justify-content-center">
                    <div className="row g-0">
                      <div className="col-md-6">
                        <img
                          src={`https://image.tmdb.org/t/p/w342/${stv.poster_path}`}
                          className="img-fluid rounded"
                          alt="Card title"
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="card-body">
                          <h5 className="card-title">{stv.name}</h5>
                          <p className="card-text">
                            <Flag
                              code={stv.original_language.toUpperCase()}
                              style={{ width: 30, height: 20 }}
                            ></Flag>
                          </p>
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
