import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/brand/uvbf-login.png";
import { FaUser, FaLock } from "react-icons/fa";

export const Home = () => {
  const formRef = useRef();
  const loginFormBtnLaunchRef = useRef();
  const loginFormBtnCancelRef = useRef();
  const navigate = useNavigate();

  // Clear User session before authentication
  // localStorage.removeItem("optiacademiqplus_auth"); // Remove a specific item
  // localStorage.clear(); // Clear all items from localStorage

  const handleSignIn = (e) => {
    const linkClass = e.target.className;

    if (linkClass.includes("sign-in-this")) {
      if (loginFormBtnLaunchRef.current) {
        loginFormBtnLaunchRef.current.click();
      }
    }

    if (linkClass.includes("sign-in-portal")) {
      document.location.href = "https://uv.bf/moodle/login/index.php";
    }
  };

  const handleCancel = () => {
    //
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    // get and prepare form data
    const formData = new FormData(formRef.current);
    formData.append("tokenType", "Bearer");
    formData.append("tokenValue", "auth");
    const formValues = Object.fromEntries(formData);
    localStorage.setItem("optiacademiqplus_auth", JSON.stringify(formValues));
    if (loginFormBtnCancelRef.current) {
      loginFormBtnCancelRef.current.click();
      navigate("/dashboard");
    }
  };

  return (
    <div className="container homePage">
      <img src={Logo} alt="uvbf-logo" />
      <h5 className="cardtitle">
        optiacademiq+<p>Un plus pour la qualité de notre l’Université !</p>
      </h5>
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            Analyse des déterminants de la réussite et du décrochage des
            étudiants à l’Université Virtuelle du Burkina Faso (UV-BF) en vue de
            la mise en place d’un modèle prédictif d’accompagnement
            personnalisé.  
          </p>
        </div>
      </div>
      <div className="grid">
        <a
          href="#"
          className="btn btn-primary me-3 mb-3 sign-in-this"
          onClick={(e) => handleSignIn(e)}
        >
          Se connecter depuis cette plateforme
        </a>
        <a
          href="#"
          className="btn btn-primary mb-3 sign-in-portal"
          onClick={(e) => handleSignIn(e)}
        >
          Se connecter via un portail
        </a>
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>
        <button
          ref={loginFormBtnLaunchRef}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        >
          <i className="fa fa-plus me-2" aria-hidden="true"></i>Launch demo
          static modal
        </button>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="loginModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="loginModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header py-1 bg-primary">
                <h5
                  className="modal-title  fw-bold text-light"
                  id="loginModalLabel"
                >
                  Connexion
                </h5>
              </div>
              <div className="modal-body my-0 py-0">
                <div>
                  {/* {formAction === "create" ? <CustomAlert alert={alert} /> : ""} */}
                </div>
                <div className="input-group mt-3 mb-2">
                  <span className="input-group-text" id="username-basic-addon1">
                    <FaUser />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Nom d'utilisateur"
                    aria-label="username"
                    aria-describedby="username-basic-addon1"
                    id="username"
                    name="username"
                    required
                    autoFocus={true}
                  />
                </div>

                <div className="input-group mb-2">
                  <span className="input-group-text" id="password-basic-addon1">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mot de passe"
                    aria-label="password"
                    aria-describedby="password-basic-addon1"
                    id="password"
                    name="password"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="submit" className="btn btn-primary">
                  <i className="fa fa-save me-1" aria-hidden="true"></i>
                  Connexion
                </button>
                <button
                  ref={loginFormBtnCancelRef}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                >
                  <i className="fa fa-close me-1" aria-hidden="true"></i>Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
