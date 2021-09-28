import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import FormNew from "./FormNew";
class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitArr: [],
      fruitId: "",
      name: "",
      image: "",
      price: "",
      showFlag: false,
    };
  }
  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;
    axios
      .get(`https://backend-exam28.herokuapp.com/getFruit?email=${email}`)

      .then((result) => {
        this.setState({
          fruitArr: result.data,
        });
      })

      .catch((error) => {
        console.log("error");
      });
  };

  handleClose = () => {
    this.setState({
      showFlag: false,
    });
  };

  showUpdateForm = (item) => {
    this.setState({
      showFlag: true,
      name: item.name,
      image: item.image,
      price: item.price,
    });
  };
  deleteFruit = (id) => {
    const { user } = this.props.auth0;
    const email = user.email;

    axios
      .delete(
        `https://backend-exam28.herokuapp.com/deleteFruit/id=${id}?email=${email}`
      )
      .then((result) => {
        this.setState({
          fruitArr: result.data,
        });
      })

      .catch((error) => {
        console.log("error");
      });
  };

  updateFruit = (event) => {
    event.preventdefult();
    const { user } = this.props.auth0;
    const email = user.email;
    const obj = {
      email: this.props.auth0.user.email,
      image: event.target.image.value,
      name: event.target.name.value,
      price: event.target.price.value,
    };
    axios
      .put(
        `https://backend-exam28.herokuapp.com/deleteFruit/${this.state.fruitId}`,
        obj
      )
      .then((result) => {
        this.setState({
          fruitArr: result.data,
        });
      })

      .catch((error) => {
        console.log("error");
      });
  };

  render() {
    return (
      <>
        <h1>My Favorite Fruits</h1>
        <Row xs={1} md={3} className="g-4"></Row>
        {this.state.fruitArr.map((item) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.price}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => this.deleteFruit(item._id)}
                >
                  delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => this.showUpdateForm(item)}
                >
                  update
                </Button>
              </Card.Body>
            </Card>
          );
        })}
        <FormNew>
          showFlag: {this.state.showFlag}
          name: {this.state.name}, image: {this.state.image}, price:{" "}
          {this.state.price}, updateFruit: {this.updateFruit}
          handleClose: {this.handleClose}
        </FormNew>
      </>
    );
  }
}

export default withAuth0(FavFruit);
