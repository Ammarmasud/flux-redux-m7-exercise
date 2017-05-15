import { createStore } from 'redux';

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

const store = createStore((state = defaultState) => {
  return state;
});

const render = () => {
  const { messages, userStatus } = store.getState();
  document.getElementById(`messages`).innerHTML = messages
    .sort((a,b) => (b.date - a.date))
    .map(message => (`
      <div>
        ${message.postedBy} : ${message.content}
      </div>
    `)).join(``);
}

render();