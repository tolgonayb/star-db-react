import React, { Component } from 'react';
import './random-planet.css';
import SwapiService from '../../services/swapi-service'
import '../spinner/spinner.css'



const Spinner = () => {
  return <h1 className="lds-double-ring" >Loading...</h1>
  
}


const RandomPlanetView = ({planet}) => {
  const {id = '-', name = '-', population = '-', rotationPeriod = '-', diameter = '-'} = planet;

  return (
  <React.Fragment>
    <img className="planet-image"
         src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
    <div>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Population</span>
          <span>{population}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Rotation Period</span>
          <span>{rotationPeriod}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Diameter</span>
          <span>{diameter}</span>
        </li>
      </ul>
    </div>
  </React.Fragment>
  )
}

class RandomPlanet extends React.Component {
  constructor() {
    super()
    this.updatePlanet()
  }

  state = {
    planet: {},
    loading: true
  }

  swapi = new SwapiService()

  updatePlanet = () => {
    const planet_id = 12;
    this.swapi.getPlanet(planet_id).then((data) => {
      this.setState({
        planet: data,
        loading: false
      })
    })
  }

  render = () => {
    const content = this.state.loading ? <Spinner /> : <RandomPlanetView planet={this.state.planet} />

    return (
      <div className="random-planet jumbotron rounded">
        {content}
      </div>
    );
  }
};



export default RandomPlanet;
