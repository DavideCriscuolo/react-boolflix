import StarRatings from "react-star-ratings"; // libreria per le stelline
import Flag from "react-world-flags"; // libreria per le bandiere
import { use, useEffect, useState } from "react";
import HeaderC from "./HeaderC";
import { Badge } from "react-bootstrap"; // libreria per badge
export default function Main() {
  const api_key = import.meta.env.VITE_API_KEY;
  const [nameFilm, setNameFilm] = useState("");
  const [film, setFilm] = useState([]);
  const [serTv, setSerTv] = useState([]);
  const [nameTv, setNameTv] = useState("");
  const [casts, setCasts] = useState([]);
  const [castsTv, setCastsTV] = useState([]);
  const [geners, setGeners] = useState([]);

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${nameFilm}`;
  const urlTv = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${nameTv}`;

  function handleChange(e) {
    setNameFilm(e.target.value);
    console.log(nameFilm);
    setNameTv(e.target.value);
    console.log(serTv);
  }
  const [isEnter, setIsEnter] = useState(null);

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

  const countryL = {
    // Mappatura per far combaciare lingua e paese
    en: "gb",
    it: "it",
    fr: "fr",
    de: "de",
    es: "es",
    pt: "pt",
    ru: "ru",
    ja: "jp",
    zh: "cn",
    ko: "kr",
    hi: "in",
    ar: "ae",
  };

  function handleEnterId(id) {
    const urlCastFilm = ` https://api.themoviedb.org/3/movie/${id}/casts?api_key=${api_key}`;
    fetch(urlCastFilm)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.cast);
        setCasts(data.cast);
        console.log(urlCastFilm);
      });
  }

  function handleEnterIdTV(id) {
    const urlCastTv = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${api_key}`;
    fetch(urlCastTv)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.cast);
        setCastsTV(data.cast);
        console.log(urlCastTv);
      });
  }

  function handleGenersMov(id) {
    const urlGenerM = ` https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;
    fetch(urlGenerM)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.genres);
        setGeners(data.genres);
        console.log(urlGenerM);
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
        <h3
          className={` text-center ${
            film.length !== 0 && serTv.length !== 0 && "pieno"
          }`}
        >
          Non hai cercato nessun Film / Serie Tv
        </h3>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-4 row-row-cols-xxl-6  w-100">
          {film.map((film) => {
            return (
              <div key={film.id} className="col p-5 ">
                <Badge bg="danger" className="fs-6">
                  Film
                </Badge>
                <div className="card border-0 mb-3 p-3 justify-content-center">
                  <div className="row g-0">
                    <div className="col-md-6">
                      <img
                        src={`https://image.tmdb.org/t/p/w342/${film.poster_path}`}
                        className="img-fluid rounded"
                        alt="Poster Film"
                        onMouseEnter={() => {
                          setIsEnter(film.id);
                          handleEnterId(film.id);
                          handleGenersMov(film.id);
                        }}
                        onMouseLeave={() => {
                          setIsEnter(null);
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <div
                        className={`card-body ${
                          isEnter === film.id && "enter"
                        }`}
                      >
                        <h5 className="card-title">{film.title}</h5>
                        <div className="card-text">
                          <span
                            className={`${
                              film.title === film.original_title && "hidden" //nel caso il titolo originale fosse uguale a quello normale
                            }`}
                          >
                            {" "}
                            <strong>Titolo Originale: </strong>
                            {film.original_title}{" "}
                          </span>
                        </div>
                        <div className="card-text">
                          <h6>
                            <strong>Trama: </strong>
                          </h6>
                          <p> {film.overview.slice(0, 150)} </p>
                        </div>
                        <div>
                          <span>
                            <strong>Lingua: </strong>{" "}
                          </span>
                          <span className="mx-2">
                            {" "}
                            {film.original_language.toUpperCase()}
                          </span>
                          <Flag
                            code={countryL[film.original_language]}
                            style={{ width: 30, height: 20 }}
                          ></Flag>
                        </div>
                        <div>
                          <strong>Voto: </strong>
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

                        <span>
                          <strong>Cast:</strong>{" "}
                        </span>
                        <ul className="list-unstyled">
                          {casts &&
                            casts.slice(0, 5).map((cast) => {
                              return <li key={cast.id}>{cast.name}</li>;
                            })}
                        </ul>
                        <div>
                          <h6>
                            {" "}
                            <strong>Generi: </strong>
                          </h6>
                          <ul className="list-inline">
                            {geners.map((gener) => {
                              return (
                                <li className="list-inline-item">
                                  {gener.name}{" "}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className=" row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-row-cols-xxl-6 p-2 w-100">
            {serTv.map((stv) => {
              return (
                <div key={stv.id} className="col p-5 ">
                  <Badge bg="success" className="fs-6">
                    Serie Tv
                  </Badge>
                  <div className="card border-0 mb-3  p-3 justify-content-center">
                    <div className="row g-0">
                      <div className="col-md-6">
                        <img
                          src={`https://image.tmdb.org/t/p/w342/${stv.poster_path}`}
                          className="img-fluid rounded"
                          alt="Poster Serie Tv"
                          onMouseEnter={() => {
                            setIsEnter(stv.id);
                            handleEnterIdTV(stv.id);
                          }}
                          onMouseLeave={() => {
                            setIsEnter(null);
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <div
                          className={`card-body ${
                            isEnter === stv.id && "enter"
                          }`}
                        >
                          <h5 className="card-title">{stv.name}</h5>
                          <div className="card-text">
                            <p
                              className={`${
                                stv.name === stv.original_name && "hidden" //nel caso il titolo originale fosse uguale a quello normale
                              }`}
                            >
                              {" "}
                              <strong>Titolo Originale: </strong>
                              {stv.original_name}{" "}
                            </p>
                            <p>
                              <strong>Trama: </strong>{" "}
                              {stv.overview.slice(0, 150)}
                            </p>
                          </div>
                          <div>
                            <span>
                              <strong>Lingua: </strong>{" "}
                            </span>
                            <span className="mx-2">
                              {" "}
                              {stv.original_language.toUpperCase()}
                            </span>
                            <Flag
                              code={countryL[stv.original_language]} // per far combaciare lingua e paese
                              style={{ width: 30, height: 20 }}
                            ></Flag>
                          </div>

                          <div>
                            <strong>Voto: </strong>
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
                          <span>
                            <strong>Cast:</strong>{" "}
                          </span>
                          <ul className="list-unstyled">
                            {castsTv &&
                              castsTv.slice(0, 5).map((cast) => {
                                return <li key={cast.id}>{cast.name}</li>;
                              })}
                          </ul>
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
