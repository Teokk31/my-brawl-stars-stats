import React, { useState } from 'react';
import './App.css';
import Profile from './components/Profile';
import BattleLog from './components/BattleLog';
import { TextField } from '@material-ui/core';

function App() {
  const [playerTag, setPlayerTag] = useState('RRGCGGUR');

  return (
    <div className='App'>
      <TextField
        id='filled-basic'
        label='Player Tag'
        onBlur={e => setPlayerTag(e.target.value)}
      />
      <Profile playerTag={playerTag} />
      <BattleLog playerTag={playerTag} />
    </div>
  );
}

export default App;
