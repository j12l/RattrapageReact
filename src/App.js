import React, { Component } from "react";
import "./App.css";
import Rattrapage from "./rattrapage/rattrapage";
import RattrapageForm from "./RattrapageForm/RattrapageForm";
import { DB_CONFIG } from "./Config/config";
import firebase from "firebase/app";
import "firebase/database";
class App extends Component {
  constructor(props) {
    super(props);
    this.ajouterTache = this.ajouterTache.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);

    this.db = this.app.database().ref().child("taches");
    this.state = {
      taches: [],
    };
  }

  componentWillMount() {
    const previousTache = this.state.tache;

    this.database.on("child_added", (snap) => {
      previousTache.push({
        id: snap.key,
        tacheContent: snap.val().tacheContent,
      });

      this.setState({
        taches: previousTache,
      });
    });
  }

  ajouterTache(tache) {
    this.database.push().set({ tacheContent: tache });
  }
  render() {
    return (
      <div className="rattrapageWrapper">
        <div className="rattrapageHeader">
          <div className="heading"> React & Firebase To-Do List</div>
        </div>
        <div className="rattrapageBody">
          {this.state.taches.map((tache) => {
            return (
              <Rattrapage
                tacheContent={tache.tacheContent}
                rattrapageId={tache.id}
                key={tache.id}
              />
            );
          })}
        </div>
        <div className="rattrapageFooter">
          <RattrapageForm ajouterTache={this.ajouterTache} />
        </div>
      </div>
    );
  }
}
export default App;
