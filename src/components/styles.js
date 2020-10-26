import styled from '@emotion/styled/macro';
import {Dialog as ReachDialog} from '@reach/dialog';
import * as C from 'styles/colors';
import * as M from 'styles/media-queries';

const buttonVariants = {
  primary: {
    background: C.indigo,
    color: C.base,
  },
  secondary: {
    background: C.gray,
    color: C.text,
  },
};

export const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({variant = 'pimary'}) => buttonVariants[variant],
);

export const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [M.small]: {
    width: '100%',
    margin: '10vh auto',
  },
});

export const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: C.base,
  color: C.text,
  border: `1px solid ${C.gray10}`,
  cursor: 'pointer',
});

export const Form = styled.from({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  '> div': {
    margin: '10px auto',
    width: '100%',
    maxWidth: '300px',
  },
});

export const Input = styled.input({
  Radius: '3px',
  border: `1px solid ${C.gray10}`,
  background: C.gray,
  padding: '8px 12px',
});

export const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const AppContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
});

export const ButtosnContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '0.75rem',
});
