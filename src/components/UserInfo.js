export default class UserInfo {
  constructor(ProfileName, ProfileTitle) {
    this._nameElement = ProfileName;
    this._aboutElement = ProfileTitle;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo(name, about) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}