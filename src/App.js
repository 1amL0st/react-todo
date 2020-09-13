import React from 'react';

import Header from './components/Header/Header';
import Inbox from './components/Inbox/Inbox'
import Footer from './components/Footer/Footer';
import AddTaskScreen from './components/AddTaskScreen/AddTaskScreen'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [
        {name: 'Say something', date: '12-09-2020'},
        {name: 'Eat something', date: '13-09-2020'}
      ]
    }

    this.FooterRBtnHandler = this.FooterRBtnHandler.bind(this);
    this.FooterLBtnHandler = this.FooterLBtnHandler.bind(this);

    this.inbox_screen = (<Inbox tasks={this.state.tasks}></Inbox>);
    this.add_task_screen = (<AddTaskScreen></AddTaskScreen>);

    this.state.screen_stack = [this.inbox_screen];

    this.CurrentScreen = this.CurrentScreen.bind(this);
    this.PushScreen = this.PushScreen.bind(this);
    this.PopScreen = this.PopScreen.bind(this);
  }

  CurrentScreen() {
    return this.state.screen_stack[this.state.screen_stack.length - 1];
  }

  PushScreen(screen) {
    this.state.screen_stack.push(screen);
    this.setState({screen_stack: this.state.screen_stack});
  }

  PopScreen() {
    this.state.screen_stack.pop();
    this.setState({screen_stack: this.state.screen_stack});    
  }

  FooterRBtnHandler() {
    if (this.CurrentScreen() === this.inbox_screen) {
      this.PushScreen(this.add_task_screen);
    }
  }

  FooterLBtnHandler() {
    if (this.CurrentScreen() === this.add_task_screen) {
      this.PopScreen();
    }
  }

  render() {
    const content = this.CurrentScreen();
    return (
      <div className="todo">
        <Header></Header>
        {content}
        <Footer
        rBtnHandler={this.FooterRBtnHandler} 
        lBtnHandler={this.FooterLBtnHandler}>
        </Footer>
      </div>
    );
  }
}

export default App;
