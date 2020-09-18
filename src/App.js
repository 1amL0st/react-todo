import React from 'react';

import Header from './components/Header/Header';
import Inbox from './components/Inbox/Inbox'
import Footer from './components/Footer/Footer';
import AddTaskScreen from './components/AddTaskScreen/AddTaskScreen'
import SettingsScreen from './components/SettingsScreen/SettingsScreen'

import MyTime from './MyTime';

class DB
{
  constructor() {
    this.GenerateTasks();
  }

  GenerateTasks() 
  {
    this.tasks = [
      {name: '1', desc: "blah-blah-blah", time: "13:16", date: '17-09-2020'},
      {name: '2', desc: "blah-blah-blah", time: "15:00", date: '17-09-2020'},
      {name: '3', desc: "blah-blah-blah", time: "09:00", date: '17-09-2020'},
      {name: '4 Rust', desc: "blah-blah-blah", time: "09:00", date: '17-09-2020'},
      {name: '5 Learn Math', desc: "blah-blah-blah", time: "09:00", date: '17-09-2020'},
      {name: '6 Learn something', desc: "blah-blah-blah", time: "09:00", date: '17-09-2020'},
      {name: '7 One', desc: "blah-blah-blah", time: "09:00", date: '17-09-2020'},
      {name: '8 Two Math', desc: "blah-blah-blah", time: "09:00", date: '17-09-2020'},
      {name: '9 Three something', desc: "blah-blah-blah", time: "22:00", date: '17-09-2020'},
      {name: '10 Three something', desc: "blah-blah-blah", time: "21:00", date: '17-09-2020'}
    ];
    /*************************************************************************** 
      Testing code!!! You must remove it!
    ****************************************************************************/
    function GetRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function GenerateTime() {
      const min_hours = new Date().getHours() + 1;
      return MyTime.MakeMyTime(GetRandomInt(min_hours, 23), GetRandomInt(0, 59), 0).slice(0, -3);
    }

    function GenerateDate() {
      const now = new Date();
      return MyTime.MakeMyDate(GetRandomInt(now.getDate() - 5, 30), now.getMonth() + 1, now.getFullYear());
    }

    for (let i = 0; i < this.tasks.length - 2; ++i) {
      let task = this.tasks[i];
      task.time = GenerateTime();
      task.date = GenerateDate();
    }

    /**************************************************************** */
    for (let i = 0; i < this.tasks.length; ++i) {
      this.tasks[i].key = i;
    }

    this.SortTasks();
  }

  SortTasks() {
    const UntileNowTime = (task) => {
      const date = MyTime.MyDateAndMyTimeToDate(task.date, task.time);
      return date - new Date();
    }

    let active = this.tasks.filter((task) => UntileNowTime(task) > 0);
    active.sort((first, second) => UntileNowTime(first) - UntileNowTime(second));;

    let failed = this.tasks.filter((task) => UntileNowTime(task) <= 0);
    failed.sort((first, second) => UntileNowTime(second) - UntileNowTime(first));;

    this.tasks = active.concat(failed);
  }

  AddTask(task)
  {
    (function AddKey(tasks) {
      let max = 0;
      if (tasks.length !== 0) {
        max = tasks[0].key;
      }
      for (let task of tasks) {
        max = Math.max(task.key, max);
      }
      task.key = max + 1;
    })(this.tasks);

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

    this.db = new DB();

    this.state = {};

    this.settings = {
      isChanged: false,
      items: [
        {name: "Notifications", isAllowed: false},
        {name: "Sound", isAllowed: true}
      ]
    }

    this.Screens = {
      AddTask: 0,
      Settings: 1,
      Inbox: 2
    };
    Object.freeze(this.Screens);

    this.HeaderSettingsBtnHandler = this.HeaderSettingsBtnHandler.bind(this);

    this.FooterRBtnHandler = this.FooterRBtnHandler.bind(this);
    this.FooterLBtnHandler = this.FooterLBtnHandler.bind(this);

    this.InboxRemoveTaskHandler = this.InboxRemoveTaskHandler.bind(this);

    this.AddTaskSubmitHandler = this.AddTaskSubmitHandler.bind(this);

    this.OnSettingsChange = this.OnSettingsChange.bind(this);
    this.settings_screen_ref = React.createRef();

    this.state.screen_stack = [this.Screens.Inbox];
    this.state.screen_stack.push(this.Screens.AddTask);

    this.CurrentScreen = this.CurrentScreen.bind(this);
    this.PushScreen = this.PushScreen.bind(this);
    this.PopScreen = this.PopScreen.bind(this);
  }

  InboxRemoveTaskHandler(task) {
    this.db.RemoveTask(task);
    this.setState(this);
  }

  AddTaskSubmitHandler(task) {
    this.db.AddTask(task);
    this.PopScreen();
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
    if (this.CurrentScreen() !== this.Screens.Settings) {
      this.settings.isChanged = false;
      this.PushScreen(this.Screens.Settings);
    }
  }

  FooterRBtnHandler() {
    if (this.CurrentScreen() === this.Screens.Inbox) {
      this.PushScreen(this.Screens.AddTask);
    } else if (this.CurrentScreen() === this.Screens.Settings) {
      this.settings.items = [...this.settings_screen_ref.current.GetSettings()];
      this.PopScreen();
    }
  }

  FooterLBtnHandler() {
    if (this.CurrentScreen() !== this.Screens.Inbox) {
      this.PopScreen();
    }
  }

  OnSettingsChange() {
    this.settings.isChanged = true;  
    this.setState(this.state);
  }

  render() {
    let content = (function RenderContent() {
      switch (this.CurrentScreen()) {
        case this.Screens.AddTask:
          return (<AddTaskScreen onSubmitHandler={this.AddTaskSubmitHandler}></AddTaskScreen>);
        case this.Screens.Settings:
          return (<SettingsScreen settings={this.settings.items} ref={this.settings_screen_ref}
            onSettingsChange={this.OnSettingsChange}></SettingsScreen>);
        case this.Screens.Inbox:
          return (<Inbox tasks={this.db.tasks} onRemoveTask={this.InboxRemoveTaskHandler}></Inbox>)
        default: break;
      }
    }).call(this);

    function DisplayFooterRBtn()
    {
      const cur_screen = this.CurrentScreen();
      if (cur_screen === this.Screens.Inbox) {
        return true;
      } else if (cur_screen === this.Screens.Settings) {
        return this.settings.isChanged;
      }
    }

    const r_btn = {
      onClick: this.FooterRBtnHandler,
      isVisible: DisplayFooterRBtn.call(this),
      isSettingsSave: this.CurrentScreen() === this.Screens.Settings && this.settings.isChanged
    }

    return (
      <div className="todo">
        <Header
        onSettingsBtnClick={this.HeaderSettingsBtnHandler}></Header>
        {content}
        <Footer
        rBtn = {r_btn}
        lBtn = {{onClick: this.FooterLBtnHandler, isVisible: (this.CurrentScreen() !== this.Screens.Inbox)}}></Footer>
      </div>
    );
  }
}

export default App;
