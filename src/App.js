import 'bootstrap/dist/css/bootstrap-reboot.css';
import '@reach/dialog/styles.css';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import VisuallyHidden from '@reach/visually-hidden';

import {Logo} from './components/logo';
import * as S from 'components/styles';

function LoginForm({onSubmit, title, close}) {
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
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <S.CircleButton onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </S.CircleButton>
      </div>
      <h3 style={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
      <S.Form onSubmit={handleSubmit}>
        <S.FormGroup>
          <label htmlFor="username">Username:</label>
          <S.Input id="username" value={username} onChange={handleChange} />
        </S.FormGroup>
        <S.FormGroup>
          <label htmlFor="password">Password:</label>
          <S.Input
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </S.FormGroup>
        <div>
          <S.Button type="submit">{title}</S.Button>
        </div>
      </S.Form>
      <S.LoadingSpinner />
    </>
  );
}

function AlertButton({type, method}) {
  const [isOpen, setIsOpen] = method;
  const dialogForm = `${type.toLowerCase()} form`;
  const variant = type === 'Login' ? 'primary' : 'secondary';
  const handleSubmit = formData => console.log(type, formData);
  const close = () => setIsOpen('none');

  return (
    <>
      <S.Button variant={variant} onClick={() => setIsOpen(type)}>
        {type}
      </S.Button>
      <S.Dialog aria-label={dialogForm} isOpen={isOpen === type}>
        <LoginForm onSubmit={handleSubmit} title={type} close={close} />
      </S.Dialog>
    </>
  );
}

function App(params) {
  const modal = useState('none');

  return (
    <S.AppContainer>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <S.ButtosnContainer>
        <AlertButton type="Login" method={modal} />
        <AlertButton type="Register" method={modal} />
      </S.ButtosnContainer>
    </S.AppContainer>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
