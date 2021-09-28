import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitArr: [],
    };
  }
  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;
    axios
      .get("https://backend-exam28.herokuapp.com/getAPI")
      .then((result) => {
        this.setState({
          fruitArr: result.data,
        });
      })

      .catch((error) => {
        console.log("error");
      });
  };

  AddFruit = (item) => {
    const { user } = this.props.auth0;
    const email = user.email;
    const obj = {
      name: item.name,
      image: item.image,
      price: item.price,
    };
    axios.post(
      `https://backend-exam28.herokuapp.com/addFruit?email=${email}`,
      obj
    );
  };

  render() {
    return (
      <>
        <h1>API Fruits</h1>
        <Row xs={1} md={3} className="g-4"></Row>
        {this.state.fruitArr.map((item) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.price}</Card.Text>
                <Button variant="primary" onClick={() => this.AddFruit(item)}>
                  Add
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </>
    );
  }
}

export default withAuth0(Home);
