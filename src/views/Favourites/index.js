import React, { Component } from "react";
import { Card, Layout, Row, Col, Input, List, Typography, Button } from "antd";

var places = JSON.parse(localStorage.getItem("places"))

const { Paragraph, Text } = Typography;

var users = JSON.parse(localStorage.getItem("users"))

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    users = JSON.parse(localStorage.getItem("users"))
    let userId = localStorage.getItem('userId')
    let userPlaces = []
    let userFav = (users.filter(user => user.uid === userId))[0].fav
    userFav.map(item => {
      places.map(place => {
        if (item === place.key)
          userPlaces.push(place)
      })
    })
    this.setState({ data: userPlaces })
  }

  deleteFav = (place) => {
    let userId = localStorage.getItem('userId')
    let userFav = (users.filter(user => user.uid === userId))[0].fav
    let newuserPlaces = userFav.filter(item => item !== place.key)
    users = users.map(user => {
      if (user.uid === userId) {
        user.fav = newuserPlaces
      }
      return user
    })
    localStorage.setItem('users', JSON.stringify(users))
    this.componentDidMount()
  }

  render() {
    return (
      <Layout>
        <Card>
          <Row>
            <Col>
              <List
                header={
                  <Paragraph strong style={{ fontSize: 20 }}>
                    {" "}
                    Favourites Places
                  </Paragraph>
                }
                size="large"
                dataSource={this.state.data}
                itemLayout="vertical"
                renderItem={item => (
                  <List.Item
                    key={item.title}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src={item.img}
                      />
                    }
                  >
                    <List.Item.Meta
                      title={<Text strong style={{ fontSize: 20 }}>{item.title}</Text>}
                      description={item.description}
                    />
                    <br />
                    <br />
                    <Button type="danger" onClick={() => { this.deleteFav(item) }}>Remove From Fav</Button>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Card>
      </Layout>
    );
  }
}
export default Favourites;
