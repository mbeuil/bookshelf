import '@reach/dialog/styles.css';
import React, {useState} from 'react';
import {Dialog} from '@reach/dialog';
import {Logo} from './components/logo';

function LoginForm({onSubmit, buttonText, close}) {
  const [infos, setInfos] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(infos);
  };
  const handleChange = event => {
    const {id, value} = event.target;
    setInfos({...infos, [id]: value});
  };
  const {username, password} = infos;

  return (
    <>
      <button onClick={close}>Close</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input id="username" value={username} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input id="password" value={password} onChange={handleChange} />
        <button type="submit">{buttonText}</button>
      </form>
    </>
  );
}

function AlertButton({type, method}) {
  const [isOpen, setIsOpen] = method;
  const close = () => setIsOpen('none');
  const dialogForm = `${type.toLowerCase()} form`;
  const handleSubmit = formData => console.log(type, formData);

  return (
    <>
      <button onClick={() => setIsOpen(type)}>{type}</button>
      <Dialog aria-label={dialogForm} isOpen={isOpen === type}>
        <LoginForm onSubmit={handleSubmit} buttonText={type} close={close} />
      </Dialog>
    </>
  );
}

function App(params) {
  const modal = useState('none');

  return (
    <div>
      <Logo />
      <h1>Bookshelf</h1>
      <AlertButton type="login" method={modal} />
      <AlertButton type="Register" method={modal} />
    </div>
  );
}

export default App;
