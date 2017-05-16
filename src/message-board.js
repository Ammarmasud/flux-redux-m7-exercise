import { createStore, combineReducers, applyMiddleware } from 'redux';
import { get } from './http';
import { createLogger } from 'redux-logger';

export const ONLINE = `ONLINE`;
export const AWAY = `AWAY`;
export const BUSY = `BUSY`;
export const OFFLINE = `OFFLINE`;

export const UPDATE_STATUS = `UPDATE_STATUS`;
export const CREATE_NEW_MESSAGE = `CREATE_NEW_MESSAGE`;

const defaultState = {
  messages:[{
    date: new Date(`2017-05-15 17:06:04`),
    postedBy:`Stan`,
    content:`I <3 the new productivity app!`
  }, {
    date: new Date(`2017-05-15 17:06:12`),
    postedBy:`Jerry`,
    content:`I don't know if the new version of Bootstrap is really better...`
  }, {
    date: new Date(`2017-05-15 17:11:43`),
    postedBy:`Tom`,
    content:`I'm going to get you Jerry!`
  }],
  userStatus: `ONLINE`
}

const userStatusReducer = (state = defaultState.userStatus, {type,value}) => {
  switch(type) {
    case UPDATE_STATUS:
      return value;
      break;
  }
  return state
}

const messageReducer = (state = defaultState.messages, {type,value,postedBy,date}) => {
  switch(type) {
    case CREATE_NEW_MESSAGE:
      const newState = [{date, postedBy, content:value}, ...state]
      return newState;
  }
  return state;
}

const combinedReducer = combineReducers({
  userStatus: userStatusReducer,
  messages: messageReducer
});

const store = createStore(
  combinedReducer,
  applyMiddleware(createLogger())
);

document.forms.newMessage.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const value = e.target.newMessage.value;
  const username = localStorage[`preferences`] ? JSON.parse(localStorage[`preferences`]).userName : `Ammar`;
  store.dispatch(newMessageAction(value, username))
})

const render = () => {
  const { messages, userStatus } = store.getState();
  document.getElementById(`messages`).innerHTML = messages
    .sort((a,b) => (b.date - a.date))
    .map(message => (`
      <div>
        ${message.postedBy} : ${message.content}
      </div>
    `)).join(``);

  document.forms.newMessage.fields.disabled = (userStatus === OFFLINE);
  document.forms.newMessage.newMessage.value = ``;
}

const statusUpdateAction = (value) => {
  return {
    type: UPDATE_STATUS,
    value
  }
}

const newMessageAction = (content,postedBy) => {
  const date = new Date();
  return {
    type: CREATE_NEW_MESSAGE,
    value: content,
    postedBy,
    date
  }
}

document.forms.selectStatus.status.addEventListener(`change`,(e)=>{
  store.dispatch(statusUpdateAction(e.target.value));
});

render();

store.subscribe(render);

console.log(`Making request...`);
get('http://pluralsight.com', (id) => {
  console.log(`Received callback`, id);
})