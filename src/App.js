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


function CountryCard(data) {
  return (<Card
    bg="light"
    text="dark"
    className="text-center"
    style={{ margin: "10px" }}
  >

    <Card.Img variant="top" src={data.countryInfo.flag} />
    <Card.Body>
      <Card.Title>{data.country}</Card.Title>
      <Card.Text>Cases {data.cases}</Card.Text>

      <Card.Text>Recovered {data.recovered}</Card.Text>
      <Card.Text>Active {data.active}</Card.Text>
      <Card.Text>Critical {data.critical}</Card.Text>
      <Card.Text>Tests {data.tests}</Card.Text>
      <Card.Text>Today's cases {data.todayCases}</Card.Text>
      <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
      <Card.Text>Population {data.population}</Card.Text>
    </Card.Body>
  </Card>)
}

function CountryList(props) {
  const countries = props.countries.map((data, i) => {
    return (
      <CountryCard
        key={i}
        {...data}
      />
    );
  });
  return (
    <Columned >{countries}</Columned>
  )
}

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
      <CardDeck>
        <SummaryCard title="Cases" bg="secondary" lastUpdated={lastUpdated} total={latest.cases} />
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


    </div>
  );
}

export default App;
