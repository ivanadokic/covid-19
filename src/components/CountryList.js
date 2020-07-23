import React from 'react';
import Card from 'react-bootstrap/Card';
import Columned from 'react-columned';

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
export default CountryList