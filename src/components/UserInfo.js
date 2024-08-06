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

  setUserInfo(name,description) {
    this._profileName.textContent = name;
    this._profileTitle.textContent = description;
  }
}