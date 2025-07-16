import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { Home } from "./views/Home";
import { Dashboard } from "./views/Dashboard";

import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/default.css";

function App() {
  return (
    <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
    </DefaultLayout>
  );
}

export default App;
