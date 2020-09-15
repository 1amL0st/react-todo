import React from 'react';

import Header from './components/Header/Header';
import Inbox from './components/Inbox/Inbox'
import Footer from './components/Footer/Footer';
import AddTaskScreen from './components/AddTaskScreen/AddTaskScreen'
import SettingsScreen from './components/SettingsScreen/SettingsScreen'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
    }

    this.tasks = [
      {name: 'Say something', desc: "blah-blah-blah", time: "09:00", date: '12-09-2020'},
      {name: 'First', desc: "blah-blah-blah", time: "09:00", date: '12-09-2020'},
      {name: 'Second', desc: "blah-blah-blah", time: "09:00", date: '12-09-2020'},
      {name: 'Learn Rust', desc: "blah-blah-blah", time: "09:00", date: '12-09-2020'},
      {name: 'Learn Math', desc: "blah-blah-blah", time: "09:00", date: '12-09-2020'},
      {name: 'Learn something', desc: "blah-blah-blah", time: "09:00", date: '12-09-2020'},
    ];

    for (let i = 0; i < this.tasks.length; ++i) {
      this.tasks[i].key = i;
    }

    this.settings = {
      isChanged: false,
      items: [
        {name: "Notifications", isAllowed: false},
        {name: "Sound", isAllowed: true}
      ]
    }

    this.HeaderSettingsBtnHandler = this.HeaderSettingsBtnHandler.bind(this);

    this.FooterRBtnHandler = this.FooterRBtnHandler.bind(this);
    this.FooterLBtnHandler = this.FooterLBtnHandler.bind(this);

    this.InboxRemoveTaskHandler = this.InboxRemoveTaskHandler.bind(this);
    this.inbox_screen = (<Inbox tasks={this.tasks} onRemoveTask={this.InboxRemoveTaskHandler}></Inbox>);

    this.AddTaskSubmitHandler = this.AddTaskSubmitHandler.bind(this);
    this.add_task_screen = <AddTaskScreen onSubmitHandler={this.AddTaskSubmitHandler}></AddTaskScreen>;

    this.settings_screen_ref = React.createRef();
    this.settings_screen = <SettingsScreen settings={this.settings.items} ref={this.settings_screen_ref}
      onSettingsChange={() => { this.settings.isChanged = true;  this.setState(this.state); }}></SettingsScreen>;

    this.state.screen_stack = [this.inbox_screen];

    this.CurrentScreen = this.CurrentScreen.bind(this);
    this.PushScreen = this.PushScreen.bind(this);
    this.PopScreen = this.PopScreen.bind(this);
  }

  InboxRemoveTaskHandler(task) {
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }

  AddTaskSubmitHandler(task) {

    (function AddKey() {
      let max = 0;
      if (this.tasks.length !== 0) {
        max = this.tasks[0].key;
      }
      for (let task of this.tasks) {
        max = Math.max(task.key, max);
      }
      task.key = max + 1;
    }).call(this);

    this.tasks.push(task);
    if (this.CurrentScreen() === this.add_task_screen) {
      this.PopScreen();
    }
    this.setState({tasks: this.tasks});
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

  HeaderSettingsBtnHandler() {
    if (this.CurrentScreen() !== this.settings_screen) {
      this.settings.isChanged = false;
      this.PushScreen(this.settings_screen);
    }
  }

  FooterRBtnHandler() {
    if (this.CurrentScreen() === this.inbox_screen) {
      this.PushScreen(this.add_task_screen);
    } else if (this.CurrentScreen() === this.settings_screen) {
      const settings = this.settings_screen_ref.current.GetSettings();
      this.settings.items = settings.slice(0, settings.length);
      this.PopScreen();
    }
  }

  FooterLBtnHandler() {
    if (this.CurrentScreen() !== this.inbox_screen) {
      this.PopScreen();
    }
  }

  render() {
    const content = this.CurrentScreen();

    function DisplayFooterRBtn()
    {
      const cur_screen = this.CurrentScreen();
      if (cur_screen === this.inbox_screen) {
        return true;
      } else if (cur_screen === this.settings_screen) {
        return this.settings.isChanged;
      }
    }

    const r_btn = {
      onClick: this.FooterRBtnHandler,
      isVisible: DisplayFooterRBtn.call(this),
      isSettingsSave: this.CurrentScreen() === this.settings_screen && this.settings.isChanged
    }

    return (
      <div className="todo">
        <Header
        onSettingsBtnClick={this.HeaderSettingsBtnHandler}></Header>
        {content}
        <Footer
        rBtn = {r_btn}
        lBtn = {{onClick: this.FooterLBtnHandler, isVisible: (this.CurrentScreen() !== this.inbox_screen)}}></Footer>
      </div>
    );
  }
}

export default App;
