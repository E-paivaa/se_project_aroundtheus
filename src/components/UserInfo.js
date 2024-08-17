export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent.trim(),
      description: this._description.textContent,
    };
  }

  setUserInfoOnSubmit(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setUserInfo(name, description, avatar) {
    this._name.textContent = name;
    this._description.textContent = description;
    this._avatar.src = avatar;
  }

  setAvatarPic(avatarURl) {
    this._avatar.src = avatarURl;
  }
}
