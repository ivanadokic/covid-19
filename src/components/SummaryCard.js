import React from 'react';
import Card from 'react-bootstrap/Card';

function SummaryCard(props) {

    return (
        <Card bg={props.bg} text="white" className="text-center" style={{ margin: "10px" }}>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.total}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small>Last updated {props.lastUpdated}</small>
            </Card.Footer>
        </Card>
    )
}

export default SummaryCard