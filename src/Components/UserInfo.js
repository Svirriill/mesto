export class UserInfo {
    constructor(userName, userInfo) {
      this._userName = document.querySelector(userName);
      this._userInfo = document.querySelector(userInfo);
    }
  
    getUserInfo() {
      const userInfo = {};
      userInfo.name = this._userName.textContent;
      userInfo.info = this._userInfo.textContent;
      return userInfo;
    }
  
    setUserInfo(data) {
      this._userName.textContent = data.name;
      this._userInfo.textContent = data.info;
    }
  }