import React, { Component } from "react";
import { render } from "react-dom";
import mehdiBase from "../../static/images/mehdi_main_dans_le_dos_neutre.svg"
import Accueil from "./Accueil";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Accueil />
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);