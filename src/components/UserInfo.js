export default class UserInfo {
    constructor(profileName, profileTitle) {
      this._profileName = profileName;
      this._profileTitle = profileTitle;
    }
  
    getUserInfo() {
      return {
        name: this._profileName.textContent,
        description: this._profileTitle.textContent,
      };
    }
  
    setUserInfo(userData) {
      this._profileName.textContent = userData.name;
      this._profileTitle.textContent = userData.description;
    }
  }