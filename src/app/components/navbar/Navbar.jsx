"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar() {
  let [view, setView] = useState(false);
  let [name, setName] = useState(null);
  let [search, setSearch] = useState(null);

  let router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      const user = JSON.parse(window.localStorage.getItem("user"));
      setName(user.name);
      setView(true);
    } else setView(false);
  }, []);

  function SingOut() {
    window.localStorage.clear();
    router.push("/auth/log");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">
          Media
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!view ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" href="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/auth/log">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/auth/sing">
                    singup
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {name || "User"}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" href="/myposts">
                        my posts
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/message">
                        my message
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" href={`/profile`}>
                        update profile
                      </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" href="/password">
                          change password
                        </Link>
                    </li>
                  </ul>
                </li>


                <li className="nav-item">
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    onClick={() => {
                      SingOut();
                    }}
                  >
                    Sing out
                  </button>
                </li>
              </>
            )}
          </ul>
          {view ? (
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                }}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  if ( search ) {
                    router.push(`/user/search/${search}`)
                  }
                }}
              >
                Search
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
