/** @jsx jsx */
import {jsx} from '@emotion/core';
import {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import './bootstrap';
import Tooltip from '@reach/tooltip';
import {FaSearch, FaTimes} from 'react-icons/fa';
import {Input, BookListUL, Spinner} from './components/lib';
import {BookRow} from './components/book-row';
import {client} from 'utils/api-client';

import * as colors from 'styles/colors';

const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'START': {
      return {...state, status: 'pending'};
    }
    case 'SUCCESS': {
      return {...state, status: 'resolved', data: action.data};
    }
    case 'ERROR': {
      return {...state, status: 'rejected', error: action.error};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function useSafeDispatch(dispatch) {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(
    (...args) => {
      if (mountedRef.current) {
        dispatch(...args);
      }
    },
    [dispatch],
  );
}

function useAsync() {
  const [{status, data, error}, unsafeDispatch] = useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const run = useCallback(
    promise => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        );
      }
      dispatch({type: 'START'});
      promise()
        .then(data => dispatch({type: 'SUCCESS', data}))
        .catch(error => dispatch({type: 'ERROR', error}));
    },
    [dispatch],
  );

  return {status, data, error, run};
}

function DiscoverBooksScreen() {
  const {status, data, error, run} = useAsync();
  const [book, setBook] = useState('');
  const [isQueried, setIsQueried] = useState(false);

  useEffect(() => {
    if (!isQueried) {
      return;
    }
    run(client(`books?query=${encodeURIComponent(book)}`));
  }, [isQueried, run, book]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    setBook(event.target.elements.search.value);
    setIsQueried(true);
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {status === 'pending' ? (
                <Spinner />
              ) : status === 'rejected' ? (
                <FaTimes aria-label="error" css={{color: colors.danger}} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {status === 'rejected' ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {status === 'resolved' ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  );
}

export {DiscoverBooksScreen};
