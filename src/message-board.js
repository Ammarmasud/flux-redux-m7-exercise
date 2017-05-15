import { createStore } from 'redux';

export const ONLINE = `ONLINE`;
export const AWAY = `AWAY`;
export const BUSY = `BUSY`;
export const OFFLINE = `OFFLINE`;

export const UPDATE_STATUS = `UPDATE_STATUS`;

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

const reducer = (state=defaultState, {type, value}) => {
  switch(type){
    case UPDATE_STATUS:
      return {...state, userStatus:value};
      break;
  }
  return state
}

const store = createStore(reducer);

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
}

const statusUpdateAction = (value) => {
  return {
    type: UPDATE_STATUS,
    value
  }
}

document.forms.selectStatus.status.addEventListener(`change`,(e)=>{
  store.dispatch(statusUpdateAction(e.target.value));
});

render();

store.subscribe(render);