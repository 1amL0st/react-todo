import React, { useState } from 'react';

import Header from './components/Header';
import Inbox from './components/Inbox'
import Footer from './components/Footer';

function App() {
  return (
    <div className="todo">
      <Header></Header>
      <Inbox></Inbox>
      <Footer></Footer>
    </div>
  );
}

export default App;
