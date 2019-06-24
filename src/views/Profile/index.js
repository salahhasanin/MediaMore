import React, { Component } from "react";
import {
  Card,
  Layout,
  List,
  Typography,
  Icon,
  Avatar,
  Row,
  Col,
  Input,
  Button
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
const { TextArea } = Input;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informationEdit: false,
      currentUser: {},
      age: ""
    };
  }

  componentDidMount() {
    let userId = JSON.parse(localStorage.getItem('userId'))
    let users = JSON.parse(localStorage.getItem('users'))
    let currentUser = users.find(user => user.uid === `${userId}`)
    this.setState({ currentUser })
    this.state.informationEdit = false

  }

  render() {
    return (
      <Layout>
        <Card>
          <Row>
            <Col span={12}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPdFf0t7vhDFPeZuflvz21Hj407UYqLaBLZFks-C7_Li_8_Oxdhg"
                alt="example"
                height="100"
                width="100"
              />
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <Icon type="profile" />
                  {!this.state.informationEdit ? (
                    <Text style={{ padding: 10 }}>{this.state.currentUser.name}</Text>
                  ) : (
                      <Input
                        defaultValue={this.state.currentUser.name}
                        style={{ maxWidth: 200, marginLeft: 10 }}
                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                      />
                    )}
                </Col>
                <Col span={12} />
                <Icon type="profile" />
                {!this.state.informationEdit ? (
                  <Text style={{ padding: 10 }}>{this.state.currentUser.age}</Text>
                ) : (
                    <Input
                      defaultValue={this.state.currentUser.age}
                      style={{ maxWidth: 200, marginLeft: 10 }}
                      onChange={(e) => { this.setState({ age: e.target.value }) }}
                    />
                  )}
              </Row>
              <br />
              <Row>
                <Col span={12}>
                  <Icon type="profile" />
                  {!this.state.informationEdit ? (
                    <Text style={{ padding: 10 }}>{this.state.currentUser.email}</Text>
                  ) : (
                      <Input
                        defaultValue={this.state.currentUser.email}
                        style={{ maxWidth: 200, marginLeft: 10 }}
                        onChange={(e) => { this.setState({ email: e.target.value }) }}

                      />
                    )}
                </Col>
                <Col span={12} />
                <Icon type="profile" />

                <Text style={{ padding: 10 }}>{this.state.currentUser.gender}</Text>

              </Row>
              <br />
              {!this.state.informationEdit ? (
                <Button
                  type="ghost"
                  onClick={() => {
                    this.setState({ informationEdit: true });
                  }}
                >
                  Edit Info
                </Button>
              ) : (
                  <div>
                    <Button type="ghost" onClick={() => {
                      let responseObj = {
                        age: this.state.age,
                        email: this.state.email,
                        name: this.state.name,
                        about: this.state.about
                      }
                      let userId = JSON.parse(localStorage.getItem("userId"))
                      let users = JSON.parse(localStorage.getItem("users"))
                      users = users.map(user => {
                        if (user.uid === `${userId}`) {
                          user.name = this.state.name
                          user.age = this.state.age
                          user.about = this.state.about
                          user.email = this.state.email
                          return user
                        }
                        else { return user }
                      })
                      localStorage.setItem("users", JSON.stringify(users))
                      this.componentDidMount()

                    }}>Save</Button>
                    <Button
                      type="ghost"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        this.setState({ informationEdit: false });
                      }}
                    >
                      Cancel
                  </Button>
                  </div>
                )}
            </Col>
          </Row>
        </Card>
        <br />
        <Card title="User Info">
          {!this.state.informationEdit ? (
            <Paragraph type="secondary">
              {/* uniform the user interface specs for internal background projects,
              lower the unnecessary cost of design differences and
              implementation and liberate the resources of design and front-end
              development. In the process of internal desktop applications
              development, many different design specs and implementations would
              be involved, which might cause designers and developers
              difficulties and duplication and reduce the efficiency of
              development. uniform the user interface specs for internal
              background projects, lower the unnecessary cost of design
              differences and implementation and liberate the resources of
              design and front-end development. In the process of internal
              desktop applications development, many different design specs and
              implementations would be involved, which might cause designers and
              developers difficulties and duplication and reduce the efficiency
              of development. */}
              {this.state.currentUser.about}
            </Paragraph>
          ) : (
              <TextArea
                rows="8"
                defaultValue={this.state.currentUser.about}
                //" uniform the user interface specs for internal background projects,
                // lower the unnecessary cost of design differences and implementation
                // and liberate the resources of design and front-end development. In
                // the process of internal desktop applications development, many
                // different design specs and implementations would be involved, which
                // might cause designers and developers difficulties and duplication
                // and reduce the efficiency of development. uniform the user interface
                // specs for internal background projects, lower the unnecessary cost
                // of design differences and implementation and liberate the resources
                // of design and front-end development. In the process of internal
                // desktop applications development, many different design specs and
                // implementations would be involved, which might cause designers and
                // developers difficulties and duplication and reduce the efficiency of
                // development."
                onChange={(e) => { this.setState({ about: e.target.value }) }}
              />
            )}
        </Card>
      </Layout>
    );
  }
}

export default Profile;
