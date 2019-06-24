import React, { Component } from 'react'
import { Table, Divider, Tag, Button, Layout } from 'antd';
import { Link } from 'react-router-dom'


class Places extends Component {

    constructor(props) {
        super(props)
        this.state = {
            places: []

        }

    }

    deletePlace = (key) => {
        let { places } = this.state
        let newPlaces = places.filter(p => p.key !== key)
        localStorage.setItem('places', JSON.stringify(newPlaces))
        this.componentDidMount()
    }

    componentDidMount() {
        let places = JSON.parse(localStorage.getItem("places"))
        this.setState({ places })
    }


    columns = [
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                return <span>
                    <Button onClick={() => { this.deletePlace(text.key) }} type="primary" ghost icon="stop">Delete</Button>
                </span>
            }
        },
    ];

    render() {
        let { places } = this.state
        return (
            <div>
                <Button type="primary" ghost icon="plus square"><Link to="/add-place">Add Place</Link></Button>
                <Table columns={this.columns} dataSource={places} />
            </div>
        )
    }
}

export default Places