import React, { Component } from 'react'
import { Card, Layout, Row, Col, Input, List, Typography, Button, Avatar, Divider } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllMenu } from '../../actions/menu'

const { Paragraph, Text } = Typography

const places = JSON.parse(localStorage.getItem("places"))


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            search: "",
            places: []
        };
    }

    componentDidMount() {
        this.props.getAllMenu()
        let users = JSON.parse(localStorage.getItem('users'))
        let topUsers = users.filter(user => {
            if (user.ismost) {
                return user
            }
        })
        this.setState({ users: topUsers, places })
    }

    handleSearch(event) {
        let newPlaces = places.filter(place => place.title.toLowerCase().includes(event.target.value.toLowerCase()))
        this.setState({ places: newPlaces })
    }

    render() {
        let { places } = this.state
        return (
            <Layout>
                <Card title="Top Reviewers">
                    <Row>
                        <Col>
                            <Row type="flex" justify="end">
                                {
                                    this.state.users ? this.state.users.map(user =>
                                        <Col span={6} key={user.uid}>
                                            <Avatar shape="square" size={64} src={user.pic} />
                                            <br />
                                            <br />
                                            <Text>{user.name}</Text>
                                        </Col>
                                    ) : <Text>No Top Reviewers</Text>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Divider type="horizontal" />
                <Card>
                    <Row>
                        <Col>
                            <Col>
                                <Input size="large" placeholder="Search places here" style={{ width: 500 }} onChange={this.handleSearch.bind(this)} />
                            </Col>
                        </Col>
                        <br />
                        <Col>
                            <List
                                header={<Paragraph>Places</Paragraph>}
                                size="large"
                                dataSource={places}
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
                                            title={item.title}
                                            description={item.description}
                                        />
                                        <br />
                                        <br />
                                        <Button type="ghost"><Link to={{
                                            pathname: "/place-details",
                                            state: {
                                                place: item
                                            }
                                        }}> View Details</Link></Button>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Card>
            </Layout>
        )
    }
}
export default connect(null, { getAllMenu })(Main)