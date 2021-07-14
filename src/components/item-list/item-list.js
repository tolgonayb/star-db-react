import React, { Component } from 'react';

import './item-list.css';
import SwapiService from '../../services/swapi-service'
import Spinner from "../spinner/index";


export default class ItemList extends Component {
  PeopleList = (peoples) => {
    return (
        <ul>
          { peoples && peoples.map(people => (
              <li key={people.id}>{people.name}</li>
          ))}
        </ul>
    )
  }

  constructor() {
    super()
    this.state = {
      loading: false,
      peoples: null
    }
    this.updatePeoplesList()
  }

  swapi = new SwapiService()

   updatePeoplesList = () => {
    this.setState({loading: true})
    this.swapi.getAllPeople().then((data) => {
      this.setState({loading: false, peoples: data})
    })
  }

  render() {
    return (
        <div className="random-people jumbotron rounded">
          {this.state.loading || !this.state.peoples ? <Spinner/> : this.PeopleList(this.state.peoples)}
        </div>
      );
  }
};
