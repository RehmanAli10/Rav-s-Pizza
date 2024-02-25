import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from './userSlice';

import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName: nameOfUser } = useSelector((store) => store.user);

  const [userName, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUser(userName));
    setUsername('');
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      {nameOfUser !== '' ? (
        <Button to={'/menu'} type={'primary'}>
          Continue Ordering, {nameOfUser}
        </Button>
      ) : (
        <>
          <p className="mb-4 text-sm text-stone-600 md:text-base">
            👋 Welcome! Please start by telling us your name:
          </p>
          <input
            type="text"
            placeholder="Your full name"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            className="input mb-8 w-72"
          />
        </>
      )}

      {userName !== '' && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
