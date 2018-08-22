const users = {
  getUserProfile(token) {
    const authToken = token || this.getStoragedToken();
    const defaults = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return this.request('/1/users/me', defaults);
  },

  setUserProfile(data) {
    const defaults = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.getStoragedToken()}`,
      },
    };

    return this.request('/1/users/me/profile', Object.assign(defaults, { data }));
  },

  refreshToken(token) {
    const defaults = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ grant_type: 'refresh_token', refresh_token: token }),
    };
    return this.request('/1/users/oauth/token', defaults);
  },
  getLogin(data) {
    const defaults = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return this.request('/1/users/oauth/token', Object.assign(defaults, { data: JSON.stringify(data) }), false, false, false);
  },

  getCveChart(data) {
    const authToken = this.getStoragedToken();
    const defaults = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
    return this.request('/1/clarities/cve_chart', Object.assign(defaults, { data: JSON.stringify(data) }));
  },

  getCveList(data) {
    const authToken = this.getStoragedToken();
    const defaults = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
    return this.request('/1/clarities/cve_list?page='.concat(data.page || '', '&limit=', data.limit || ''), Object.assign(defaults, { data: JSON.stringify(data) }));
  },

  getCVEDetail(CVENum) {
    const defaults = {
      headers: {
        Authorization: `Bearer ${this.getStoragedToken()}`,
      },
    };
    return this.request(`/1/clarities/cve_info/${CVENum}`, defaults);
  },
  confirmAdmin(data) {

    const defaults = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return this.request('/1/users/confirm_admin', Object.assign(defaults, { data: JSON.stringify(data) }), false, false, false);
  },
};

export default users;
