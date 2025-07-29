import { Link, NavLink } from "react-router-dom";

export default function HeaderC(prop) {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-nav p-3 gap-3">
          <div className="container-fluid ">
            <a href="#">
              <h1>BOOLFLIX</h1>
            </a>
          </div>
          <form className="d-flex" onSubmit={prop.gnrFilmStv}>
            <input
              className="form-control mx-2 "
              onChange={prop.handleChange}
              value={(prop.nameFilm, prop.nameTv)}
              type="text"
              placeholder="Cearca Film/Serie Tv"
              aria-label="Cearca Film/Serie Tv"
            />
            <button className="btn btn-outline-danger my-2" type="submit">
              Cerca
            </button>
          </form>
        </nav>
      </header>
    </>
  );
}
