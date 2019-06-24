import React, { Component } from 'react'
import { Table, Divider, Tag, Button } from 'antd';





class Places extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []

        }

    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    <Button  onClick={() => { this.deleteUser(this.state.users[index]) }} type="primary" ghost icon="stop">Delete</Button>
                </span>
            ),
        },
    ];

    data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    deleteUser = (data) => {
        console.log(data.uid)
        console.log(this.state.users)
        let { users } = this.state
        let newUsers = users.filter(p => p.uid !== data.uid)
        localStorage.setItem('users', JSON.stringify(newUsers))
        this.componentDidMount()
    }

    componentDidMount() {
        let users = JSON.parse(localStorage.getItem("users"))
        this.setState({ users })
    }

    render() {
        let { users } = this.state

        return (
            <Table columns={this.columns} dataSource={users} />
        )
    }
}

export default Places