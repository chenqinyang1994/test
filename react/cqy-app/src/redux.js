function createStore(reducer) {
    let state;
    let listeners = [];
    let subscribe = (listener) => { // 订阅
        listeners.push(listener);
        return () => {
            // 再次调用时 移除监听函数
            listeners = listeners.filter(fn => fn !== listener);
        }
    }
    let getState = () => JSON.parse(JSON.stringify(state));
    function dispatch(action) { // 发布
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }
    dispatch({});
    // 将方法暴露给外面使用,将状态放到了容器中外部无法在进行更改了
    return { dispatch, getState, subscribe }
}
let initState = {
    title: {
        color: 'red',
        text: '标题'
    },
    content: {
        color: 'blue',
        text: '内容'
    }
}
// 用户自己定义的规则 我们叫它reducer 也就是所谓的管理员
// reducer要有两个参数 要根据老的状态和新传递的动作算出新的状态
// 如果想获取默认状态 有一种方式 就是调用reducer 让每一个规则都不匹配将默认值返回
// 在reducer中 reducer是一个纯函数 每次需要返回一个新的状态
const CHANGE_TITLE_COLOR = 'CHANGE_TITLE_COLOR';
const CHANGE_CONTENT_TEXT = 'CHANGE_CONTENT_TEXT';
function reducer(state = initState, action) {
    switch (action.type) {
        case CHANGE_TITLE_COLOR:
            return { ...state, title: { ...state.title, color: action.color } }
        case CHANGE_CONTENT_TEXT:
            return { ...state, content: { ...state.content, text: action.text } };
        default:
            return state;
    }
}
// 将定义状态 和 规则的部分抽离到外面去

let store = createStore(reducer);
function renderTitle() {
    let title = document.querySelector('#title');
    title.style.background = store.getState().title.color;
    title.innerHTML = store.getState().title.text;
}
function renderContent() {
    let content = document.querySelector('#content');
    content.style.background = store.getState().content.color;
    content.innerHTML = store.getState().content.text;
}
function render() {
    renderTitle();
    renderContent();
}
render();
store.subscribe(render)
// 发布订阅模式 先将render方法 订阅好，每次dispatch时都调用订阅号的方法
setTimeout(() => {
    store.dispatch({ type: CHANGE_CONTENT_TEXT, text: '珠峰培训' });
}, 2000);