import React from 'react'
import { Form, Select, Input, Button, Card } from 'antd'
import { Link, withRouter } from 'react-router-dom'

var places = JSON.parse(localStorage.getItem('places'))

const { Option } = Select;

class App extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHnS9HEKJYZVuPAUaEutWjYsfu4tn1jtsIpSjeqefvNcX-1ibG",
                    values.rate = "1",
                    values.key = places.length + 24
                values.comments = []
                places.push(values)
                localStorage.setItem("places", JSON.stringify(places))
                this.props.history.push('/places')
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title="Add Place">
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input the name!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Title">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input the title!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Description">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please input the description!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Category">
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: 'Please select Category!' }],
                        })(
                            <Select
                                placeholder="Select a option and change input text above"
                            >
                                <Option value="Restaurant">Restaurant</Option>
                                <Option value="Cafe">Cafe</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                        <Button type="primary" htmlType="submit">
                            Add Place
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

const WrappedApp = Form.create({ name: 'coordinated' })(App)

export default withRouter(WrappedApp)