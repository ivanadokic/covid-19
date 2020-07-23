import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Form from 'react-bootstrap/Form'
import Columned from 'react-columned';
import NavBar from './components/NavBar';
import SummaryCard from './components/SummaryCard'
import CountryList from './components/CountryList'


function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setsearchCountries] = useState("");
  const filterCountries = results.filter(item => {
    return searchCountries !== "" ? item.country.toLowerCase().includes(searchCountries.toLowerCase()) : item;
  })


  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")

      ])

      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });

  }, []);
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  return (
    <div>
      <Router>
        <NavBar />
        <Route path='/' component={SummaryCard}></Route>
        <CardDeck>
          <SummaryCard title="Total Cases" bg="secondary" lastUpdated={lastUpdated} total={latest.cases} />
          <SummaryCard title="Deaths" bg="danger" lastUpdated={lastUpdated} total={latest.deaths} />
          <SummaryCard title="Recovered" bg="success" lastUpdated={lastUpdated} total={latest.recovered} />
        </CardDeck>

        <Form>
          <Form.Group controlId="formGroupSearch">
            <Form.Label>Search Country</Form.Label>
            <Form.Control type="text"
              placeholder="Enter Country name"
              onChange={e => setsearchCountries(e.target.value)} />
          </Form.Group>
        </Form>

        <CountryList countries={filterCountries} />
      </Router>
    </div >
  );
}

export default App;
