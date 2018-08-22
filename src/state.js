import { observable } from 'mobx';
import UserStore from './stores/userStore';
import ReportStore from './stores/ReportStore';
import RouterStore from './stores/routerStore';


// Default state structure
// Everything that defines our application and that could be
// shared between components should be declared here.
const defaultState = observable({
  app: {
    title: 'Secure Planet',
  },
  user: new UserStore(),
  report: new ReportStore(),
  routerState: new RouterStore(),
});

export default defaultState;
