import React, { Component } from 'react'
import { Card, Row, Col, Typography, List, Layout, Divider, Rate, Icon, Button, Tabs, Input } from 'antd'

const { Paragraph, Text } = Typography
const { TabPane } = Tabs
const { TextArea } = Input

class PlaceDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            newComment: ""
        }
    }

    componentDidMount() {
        if (this.props.location.state) {
            let { place } = this.props.location.state
            this.setState({ data: place })
        }
    }

    checkFav() {
        let userId = localStorage.getItem("userId")
        let users = JSON.parse(localStorage.getItem('users'))
        let favPlaces = users.filter(user => {
            if (user.uid === userId)
                return user
        })
        return favPlaces[0].fav.includes(this.state.data.key)
    }

    submitComment() {
        let { newComment } = this.state
        let places = JSON.parse(localStorage.getItem("places"))
        places = places.map(place => {
            if (place.key === this.state.data.key) {
                place.comments.push({
                    userName: localStorage.getItem("userName"),
                    comment: newComment
                })
            }
            return place
        })
        localStorage.setItem("places", JSON.stringify(places))
        let thisPlace = places.filter(place => place.key === this.state.data.key)
        this.setState({ data: thisPlace[0], newComment: "" })
    }

    toggleFav() {
        let check = this.checkFav()
        let userId = localStorage.getItem("userId")
        let users = JSON.parse(localStorage.getItem('users'))
        users = users.map(user => {
            if (user.uid === userId) {
                if (check) {
                    user.fav = user.fav.filter(item => item !== this.state.data.key)
                } else {
                    user.fav.push(this.state.data.key)
                }
            }
            return user
        })
        localStorage.setItem("users", JSON.stringify(users))
        this.componentDidMount()
    }

    handleComment(event) {
        this.setState({ newComment: event.target.value })
    }

    render() {
        console.log(this.state.data.length)
        return (
            <Layout>
                <Card>
                    <Row>
                        <Col>
                            <Row gutter={80}>
                                <Col span={8}>
                                    <img src={this.state.data.img || ""} alt="Image" width="250" height="200" />
                                </Col>
                                <Col span={8}>
                                    <Text strong style={{ fontSize: 20 }}> {this.state.data.title || ""}</Text>
                                    <br />
                                    <br />
                                    <Paragraph type="secondary">{this.state.data.description || ""}</Paragraph>
                                </Col>
                                <Col span={8}>
                                    <Rate allowHalf value={parseInt(this.state.data.rate) || parseInt("1")} disabled />
                                    <br />
                                    <br />
                                    <Button type="ghost" ghost onClick={this.toggleFav.bind(this)}><Icon type="heart" theme={this.checkFav() ? "filled" : ""} style={{ color: "red" }} /></Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Divider type="horizontal" />
                <Tabs type="card" defaultActiveKey="2">
                    <TabPane tab="Reviews" key="1">
                        <Card>
                            <Row gutter={60}>
                                <Col span={8}>
                                    <Text strong>Positive</Text>
                                    <br />
                                    <br />
                                    <List
                                        dataSource={Object.keys(this.state.data).length > 0 ? this.state.data.reviews[0].positive : []}
                                        renderItem={item => <List.Item>{item}</List.Item>}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Text strong>Negative</Text>
                                    <br />
                                    <br />
                                    <List
                                        dataSource={Object.keys(this.state.data).length > 0 ? this.state.data.reviews[0].negative : []}
                                        renderItem={item => <List.Item>{item}</List.Item>}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Text strong>Fake</Text>
                                    <br />
                                    <br />
                                    <List
                                        dataSource={Object.keys(this.state.data).length > 0 ? this.state.data.reviews[0].fake : []}
                                        renderItem={item => <List.Item>{item}</List.Item>}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </TabPane>
                    <TabPane tab="Users Comments" key="2">
                        <Layout>
                            {
                                this.state.data.comments ?
                                    this.state.data.comments.map((comment, index) =>
                                        <Card key={index}>
                                            <Text strong>{comment.userName}</Text>
                                            <Paragraph>{comment.comment}</Paragraph>
                                        </Card>
                                    )
                                    :
                                    <Text>No Comments</Text>
                            }
                            <Divider type="horizontal" />
                            <Row type="flex" align="middle" gutter={20}>
                                <Col span={20}>
                                    <TextArea
                                        placeholder="ُEnter your comment"
                                        onChange={this.handleComment.bind(this)}
                                        value={this.state.newComment}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Button type="primary" ghost onClick={this.submitComment.bind(this)}>Submit Comment</Button>
                                </Col>
                            </Row>
                        </Layout>
                    </TabPane>
                </Tabs>
            </Layout>
        )
    }
}

export default PlaceDetails