import React, { Component } from "react";
import {
  Card,
  Layout,
  List,
  Typography,
  Button,
  Divider,
  Badge
} from "antd";
import { Link } from "react-router-dom";


const { Text } = Typography;
const { Meta } = Card;

class PopularPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    let placesx = [];
    let places = JSON.parse(localStorage.getItem("places"))
    let newPlaces = places.filter((place, index) => {
      if (index < 5)
        return place
    })
    newPlaces.map(place => {
      placesx.push(place);
    })
    this.setState({ data: placesx });
  }

  render() {
    return (
      <Layout>
        <List
          grid={{
            gutter: 40,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 3
          }}
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item>
              <Card
                cover={<img alt="example" src={item.img} width="5" height="500" />}
                actions={[
                  <Button>
                    <Link to={{
                      pathname: "/place-details",
                      state: {
                        place: item
                      }
                    }}> View Details</Link>
                  </Button>
                ]}
              >
                <Badge
                  count={item.category}
                  style={{ backgroundColor: "#52c41a" }}
                />
                <br />
                <br />
                <Meta
                  title={item.title}
                  description={
                    <Text style={{ maxHeight: 100 }}>
                      {item.description
                        .substring(0, 200)
                        .concat(" .............")}
                    </Text>
                  }
                />
              </Card>
              <Divider type="vertical" />
            </List.Item>
          )}
        />
      </Layout>
    );
  }
}

export default PopularPlaces;
