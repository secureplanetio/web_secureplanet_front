import { observable } from 'mobx';

class ReportStore {
  @observable isLoading = true;
  @observable uploadingProgress = 0;
}

export default ReportStore;
