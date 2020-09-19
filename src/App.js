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
    this.tasks = [];
    //this.GenerateTasks();
  }

  /*************************************************************************** 
      Testing code!!! You must remove it!
  ****************************************************************************/
  GenerateTasks() {
    this.tasks = [
    ];

    for (let i = 0; i < 5; ++i){
      this.tasks.push({
        name: String(100 + i + " test"),
        desc: i,
        time: "",
        date: ""
      });
    }
    function GetRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function GenerateTime() {
      const now = new Date();
      const [min_hours, max_hours] = [now.getHours() + 1, now.getHours() + 3];
      return MyTime.MakeMyTime(GetRandomInt(min_hours, max_hours), GetRandomInt(0, 59), 0).slice(0, -3);
    }

    function GenerateDate() {
      const now = new Date();
      const [min_date, max_date] = [now.getDate(), now.getDate() + 1];
      return MyTime.MakeMyDate(GetRandomInt(min_date, max_date), now.getMonth() + 1, now.getFullYear());
    }

    for (let i = 0; i < this.tasks.length - 2; ++i) {
      let task = this.tasks[i];
      task.time = GenerateTime();
      task.date = GenerateDate();
      task.isNotified = false;
    }

    const now = new Date();
    for (let i = 0; i < 5; ++i) {
      const m = new Date();
      m.setMinutes(now.getMinutes() + i + 1);
      const time = MyTime.DateToMyTime(m).slice(0, -3);
      this.tasks.push({name: "Task " + (i + 1), desc: "", time: time, date: "19-09-2020"});
    }
    
    for (let i = 0; i < this.tasks.length; ++i) {
      this.tasks[i].key = i;
    }

    this.SortTasks();
  }
  /**************************************************************** */
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

  AddTask(task) {
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

  RemoveTask(task) {
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }
}

class Logic {
  constructor(db) {
    this.db = db;
    
    this.settings = {
      isChanged: false,
      items: [
        {name: "Notifications", isAllowed: false, isSupported: false},
        {name: "Sound", isAllowed: true, isSupported: false}
      ]
    }

    this.RequestNotificationPermission = this.RequestNotificationPermission.bind(this);
    this.RequestNotificationPermission();

    this.settings.items[1].isSupported = (Audio !== undefined);

    this.notification_interval = setInterval(() => {
      this.db.SortTasks();
    }, 1000 * 5);
  }

  RequestNotificationPermission() {
    const is_supported = Notification !== undefined;
    this.settings.items[0].isSupported = is_supported;
    if (is_supported) {
      Notification.requestPermission()
        .then(() => { this.settings.items[0].isAllowed = (Notification.permission === 'granted');} )
        .catch(() => {this.settings.items[0].isAllowed = false;});
    }
  }

  ShowNotifications() {
    if (this.settings.items[0].isSupported && this.settings.items[0].isAllowed) {
      let task = this.db.tasks.find(task => (MyTime.MyDateAndMyTimeUntilNow(task.date, task.time).ms < 0) && (!task.isNotified));
      if (task) {
        let notification = new Notification(task.name, {
          body: task.desc
        });
        notification.onclick = (e) => {
          //TODO: GO to user's task or do nothing
        }
      } else { }
    }

    this.db.tasks.forEach(task => {
      if (MyTime.MyDateAndMyTimeUntilNow(task.date, task.time).ms < 0) task.isNotified = true;
    });
    this.db.SortTasks();
  }

  OnSettingsChange(items) {
    this.settings.isChanged = true;

    if (!this.settings.items[0].isAllowed && items[0].isAllowed) {
      this.RequestNotificationPermission();
    }

    this.settings.items[1].isAllowed = items[1].isAllowed;
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.db = new DB();

    this.logic = new Logic(this.db);

    this.state = {};

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

    this.state.screen_stack = [this.Screens.Inbox];
    //this.state.screen_stack.push(this.Screens.Settings);

    this.CurrentScreen = this.CurrentScreen.bind(this);
    this.PushScreen = this.PushScreen.bind(this);
    this.PopScreen = this.PopScreen.bind(this);
  }

  componentDidMount() {
    this.notification_interval = setInterval(() => {
      this.logic.ShowNotifications();
      this.forceUpdate();
    }, 1000 * 30);
  }

  componentWillUnmount() {
    clearInterval(this.notification_interval);
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
      this.logic.settings.isChanged = false;
      this.PushScreen(this.Screens.Settings);
    }
  }

  FooterRBtnHandler() {
    if (this.CurrentScreen() === this.Screens.Inbox) {
      this.PushScreen(this.Screens.AddTask);
    } else if (this.CurrentScreen() === this.Screens.Settings) {
      this.PopScreen();
    }
  }

  FooterLBtnHandler() {
    if (this.CurrentScreen() !== this.Screens.Inbox) {
      this.PopScreen();
    }
  }

  OnSettingsChange(items) {
    this.logic.OnSettingsChange(items);
    this.forceUpdate();
  }

  render() {
    let content = (function RenderContent() {
      switch (this.CurrentScreen()) {
        case this.Screens.AddTask:
          return (<AddTaskScreen onSubmitHandler={this.AddTaskSubmitHandler}></AddTaskScreen>);
        case this.Screens.Settings:
          return (<SettingsScreen settings={this.logic.settings.items}
            onSettingsChange={this.OnSettingsChange}></SettingsScreen>);
        case this.Screens.Inbox:
          return (<Inbox tasks={this.db.tasks} onRemoveTask={this.InboxRemoveTaskHandler}></Inbox>)
        default: break;
      }
    }).call(this);

    function DisplayFooterRBtn() {
      const cur_screen = this.CurrentScreen();
      if (cur_screen === this.Screens.Inbox) {
        return true;
      }
    }

    const r_btn = {
      onClick: this.FooterRBtnHandler,
      isVisible: DisplayFooterRBtn.call(this),
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
