export class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
      this._userName = document.querySelector(userNameSelector);
      this._userInfo = document.querySelector(userInfoSelector);
    }
  
    getUserInfo() {
      const informationAboutUser = {};
      informationAboutUser.user = this._userName.textContent;
      informationAboutUser.info = this._userInfo.textContent;
      return this._informationAboutUser;
    }
  
    setUserInfo(user, info) {
      this._userName.textContent = user;
      this._userInfo.textContent = info;
    }
  }