import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

//获取轮播图
export let slides = () => {
    return axios.get('/slides')
}

//获取热门图书
export let getBooks = () => {
    return axios.get('/hot')
}

//获取全部图书
export let allBooks = () => {
    return axios.get('/book')
}

//删除图书
export let removeBook = (id) => {
    return axios.delete(`/book?id=${id}`)
}

//获取某一本图书
export let findOneBook = (id) => {
    return axios.get(`/book?id=${id}`)
}

//修改图书
export let updataBook = (id, data) => {
    return axios.put(`/book?id=${id}`, data)
}

//添加图书
export let addBook = (data) => {
    return axios.post(`/book`, data)
}


export let getAll = () => {
    return axios.all([slides(), getBooks()])
}