var users = JSON.parse(localStorage.getItem("users"))
// import users from '../api/mock/user'

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var normalAxios = axios.create();
var mockAxios = axios.create();

var mock = new MockAdapter(mockAxios);

mock.onPut('/login').reply(config => {
  // const users = require('./mock/user')
  // localStorage.setItem("users", JSON.stringify(users))
  // const places = require('../views/PopularPlaces/data')
  // localStorage.setItem("places", JSON.stringify(places))
  let postData = JSON.parse(config.data).data
  let { user, password } = postData
  let result = users.filter(item => item.name === user)
  if (result.length > 0) {
    if (result[0].password == password) {
      localStorage.setItem("userRole", result[0].role)
      localStorage.setItem("userId", result[0].uid)
      localStorage.setItem("userName", result[0].name)
      return [200, require('./mock/user')]
    } else {
      return [500, { message: "Incorrect user or password" }]
    }
  }
});

const role = localStorage.getItem("userRole")

mock.onGet('/logout').reply(200, {})
mock.onGet('/my').reply(200, require('./mock/user'))
mock.onGet('/menu').reply(200, { menus: require('./mock/menu').menus.filter(item => item.role === role) })
mock.onGet('/randomuser').reply((config) => {
  return new Promise(function (resolve, reject) {
    normalAxios.get('https://randomuser.me/api', {
      params: {
        results: 10,
        ...config.params,
      },
      responseType: 'json'
    }).then((res) => {
      resolve([200, res.data]);
    }).catch((err) => {
      resolve([500, err]);
    });
  });
});

export default mockAxios;
