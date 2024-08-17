export default class Api {
  constructor(info) {
    this._baseUrl = info.baseUrl;
    this._headers = info.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async getIntitialCards() {
    const response = await fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    });
    return await this._checkResponse(response);
  }

  async getUserInfo() {
    const response = await fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    });
    return await this._checkResponse(response);
  }

  // loadPage(userInfo, cardInfo, avatarInfo) {
  //   return Promise.all(userInfo, cardInfo, avatarInfo);
  // }

  async deleteCard(cardId) {
    const response = await fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    });
    return await this._checkResponse(response);
  }

  async addCard(cardData) {
    const response = await fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.cardUrl,
      }),
    });
    return await this._checkResponse(response);
  }

  async updateProfile(profileInfo) {
    const response = await fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: profileInfo.name,
        about: profileInfo.badge,
      }),
    });
    return await this._checkResponse(response);
  }

  async addLikes(cardId) {
    console.log(cardId);
    const response = await fetch(
      this._baseUrl + "/cards/" + cardId + "/likes",
      {
        method: "PUT",
        headers: this._headers,
      }
    );
    return await this._checkResponse(response);
  }

  async removeLikes(cardId) {
    const response = await fetch(
      this._baseUrl + "/cards/" + cardId + "/likes",
      {
        method: "DELETE",
        headers: this._headers,
      }
    );
    return await this._checkResponse(response);
  }

  async checkLikesTruthy(cardId) {
    const response = await fetch(this._baseUrl + "/cards/" + cardId, {
      method: "GET",
      headers: this._headers,
    });
    return await this._checkResponse(response);
  }

  async updateAvatar(Url) {
    const response = await fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: Url }),
    });
    return await this._checkResponse(response);
  }
}
