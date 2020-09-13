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
        {name: 'Say something', desc: "blah-blah-blah", time: "09:00", date: '12-09-2020'},
        {name: 'First', desc: "blah-blah-blah", time: "09:00", date: '12-09-2020'},
        {name: 'Second', desc: "blah-blah-blah", time: "09:00", date: '12-09-2020'},
      ]
    }

    this.FooterRBtnHandler = this.FooterRBtnHandler.bind(this);
    this.FooterLBtnHandler = this.FooterLBtnHandler.bind(this);

    this.inbox_screen = (<Inbox tasks={this.state.tasks}></Inbox>);

    this.AddTaskSubmitHandler = this.AddTaskSubmitHandler.bind(this);
    this.add_task_screen = <AddTaskScreen onSubmitHandler={this.AddTaskSubmitHandler}></AddTaskScreen>;

    this.state.screen_stack = [this.inbox_screen];

    this.CurrentScreen = this.CurrentScreen.bind(this);
    this.PushScreen = this.PushScreen.bind(this);
    this.PopScreen = this.PopScreen.bind(this);

    //this.state.screen_stack.push(this.add_task_screen);
  }

  AddTaskSubmitHandler(task) {
    this.state.tasks.push(task);
    if (this.CurrentScreen() === this.add_task_screen) {
      this.PopScreen();
    }
    this.setState({tasks: this.state.tasks});
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
        rBtn = {{onClick: this.FooterRBtnHandler, isVisible: (this.CurrentScreen() === this.inbox_screen)}}
        lBtn = {{onClick: this.FooterLBtnHandler, isVisible: (this.CurrentScreen() !== this.inbox_screen)}}
        >
        </Footer>
      </div>
    );
  }
}

export default App;
