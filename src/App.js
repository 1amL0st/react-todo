import React from 'react';

import Header from './components/Header/Header';
import Inbox from './components/Inbox/Inbox'
import Footer from './components/Footer/Footer';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [
        {name: 'Say something', date: '12-09-2020'},
        {name: 'Eat something', date: '13-09-2020'}
      ]
    }

    this.AddButtonHandler = this.AddButtonHandler.bind(this);
  }

  AddButtonHandler() {
    console.log("Add button is pressed!");
    this.setState({tasks: [
      {name: "New", date: "Never"}
    ]});
  }

  render() {
    return (
      <div className="todo">
        <Header></Header>
        <Inbox tasks={this.state.tasks}></Inbox>
        <Footer addButtonHandler={this.AddButtonHandler}>
        </Footer>
      </div>
    );
  }
}

export default App;
