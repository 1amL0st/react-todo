import React from 'react';

import Header from './components/Header/Header';
import Inbox from './components/Inbox/Inbox'
import Footer from './components/Footer/Footer';
import AddTaskScreen from './components/AddTaskScreen/AddTaskScreen'
import SettingsScreen from './components/SettingsScreen/SettingsScreen'

import Helpers from './Helpers';

class DB
{
  constructor() {
    this.GenerateTasks();
  }

  GenerateTasks() 
  {
    this.tasks = [
      {name: '1', desc: "blah-blah-blah", time: "13:16", date: '16-09-2020'},
      {name: '2', desc: "blah-blah-blah", time: "15:00", date: '16-09-2020'},
      {name: '3', desc: "blah-blah-blah", time: "09:00", date: '16-09-2020'},
      {name: '4 Rust', desc: "blah-blah-blah", time: "09:00", date: '16-09-2020'},
      {name: '5 Learn Math', desc: "blah-blah-blah", time: "09:00", date: '16-09-2020'},
      {name: '6 Learn something', desc: "blah-blah-blah", time: "09:00", date: '16-09-2020'},
      {name: '7 One', desc: "blah-blah-blah", time: "09:00", date: '16-09-2020'},
      {name: '8 Two Math', desc: "blah-blah-blah", time: "09:00", date: '16-09-2020'},
      {name: '9 Three something', desc: "blah-blah-blah", time: "09:00", date: '16-09-2020'},
      {name: '10 Three something', desc: "blah-blah-blah", time: "09:00", date: '16-09-2020'}
    ];
    /*************************************************************************** 
      Testing code!!! You must remove it!
    ****************************************************************************/
    function FirstZero(value)
    {
      if (value < 10) {
        return "0" + value;
      }
      return value;
    }

    function GenerateTime() {
      const min_hours = new Date().getHours() + 1;
      const hours = FirstZero(Helpers.GetRandomInt(min_hours, 23));
      const mins = FirstZero(Helpers.GetRandomInt(0, 60));
      return hours + ":" + mins;
    }

    function GenerateDate() {
      const now = new Date();
      const day = FirstZero(Helpers.GetRandomInt(now.getDate() - 16, 28));
      const month = FirstZero(now.getMonth() + 1);
      return day + "-" + month + "-" + now.getFullYear();
    }
    /**************************************************************** */
    for (let i = 0; i < this.tasks.length; ++i) {
      let task = this.tasks[i];
      task.key = i;
      task.time = GenerateTime();
      task.date = GenerateDate();
    }

    this.SortTasks();
  }

  SortTasks() {
    const UntileNowTime = (task) => {
      const date_str = task.date.split("-").reverse().join("-") + " " + task.time;
      return Date.parse(date_str) - new Date();
    }

    let active = this.tasks.filter((task) => UntileNowTime(task) > 0);
    //active.sort((first, second) => UntileNowTime(first) - UntileNowTime(second));;

    let failed = this.tasks.filter((task) => UntileNowTime(task) <= 0);
    //failed.sort((first, second) => UntileNowTime(second) - UntileNowTime(first));;
    console.log('tasks = ', this.tasks);
    console.log('active = ', active);
    console.log('failed = ', failed);
    this.tasks = active.concat(failed);
  }

  AddTask(task)
  {
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
    this.SortTasks();
  }

  RemoveTask(task) 
  {
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.db = new DB();

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
    this.inbox_screen = (<Inbox tasks={this.db.tasks} onRemoveTask={this.InboxRemoveTaskHandler}></Inbox>);

    this.AddTaskSubmitHandler = this.AddTaskSubmitHandler.bind(this);
    this.add_task_screen = <AddTaskScreen onSubmitHandler={this.AddTaskSubmitHandler}></AddTaskScreen>;

    this.settings_screen_ref = React.createRef();
    this.settings_screen = <SettingsScreen settings={this.settings.items} ref={this.settings_screen_ref}
      onSettingsChange={() => { this.settings.isChanged = true;  this.setState(this.state); }}></SettingsScreen>;

    this.state.screen_stack = [this.inbox_screen];

    this.CurrentScreen = this.CurrentScreen.bind(this);
    this.PushScreen = this.PushScreen.bind(this);
    this.PopScreen = this.PopScreen.bind(this);

    //this.state.screen_stack.push(this.add_task_screen);
  }

  InboxRemoveTaskHandler(task) {
    this.db.RemoveTask(task);
  }

  AddTaskSubmitHandler(task) {
    this.db.AddTask(task);

    if (this.CurrentScreen() === this.add_task_screen) {
      this.PopScreen();
    }
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
