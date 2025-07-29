import { Link } from "react-router-dom";

export default function HeaderC() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-nav p-3">
          <div className="container-fluid ">
            <a href="">
              <img className="logo" src="./logo.png" alt="Logo BoolFlix" />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
