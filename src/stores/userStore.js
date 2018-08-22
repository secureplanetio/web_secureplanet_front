import { observable, action } from 'mobx';
import api from '../api';

class userStore {
  @observable id = '';
  @observable name = '';
  @observable role = '';
  @observable image_thumb = '';
  @observable image_medium = '';
  @observable email = '';
  @observable appVersion = '';
  @observable access_token = '';
  @observable token_type = '';
  @observable refresh_token = '';
  @observable isLoading = true;
  @observable required_setting = '';

  @action setUserProfile(profile) {
    this.name = profile.name;
    this.image_thumb = `/1/users/me/profile_image/${profile.id}?`.concat('?').concat(new Date().getTime());
    this.image_medium = `/1/users/me/profile_image/${profile.id}?`.concat('?').concat(new Date().getTime());
    this.email = profile.email;
    this.role = profile.role;
  }

  @action setSession(session) {
    this.access_token = session.access_token;
    this.token_type = session.token_type;

    localStorage.setItem('session', JSON.stringify(session));

    return api.getUserProfile(this.access_token)
      .then((response) => {
        this.setUserProfile(response.response);
        this.isLoading = false;
      });

  }

  @action setRequiredSetting(data) {
    this.required_setting = data;
  }

  getValidSession() {
    let storageSession = {};
    if (localStorage.getItem('session')) {
      storageSession = JSON.parse(localStorage.getItem('session'));
      const now = Date.now();
      const expiration = (storageSession.created_at + storageSession.expires_in) * 1000;
      if (now > expiration) {
        return api.refreshToken(storageSession.refresh_token)
          .then((response) => {
            if (!response || response.error) return Promise.reject();
          });
      }
      return this.setSession(storageSession);
    }
    return Promise.reject();
  }
}


export default userStore;
