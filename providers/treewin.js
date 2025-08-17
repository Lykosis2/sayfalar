import { ofetch } from 'ofetch'

const BASE_URL = 'https://ws01.treewin.com.tr'

// Use this to check exp date
function parseJwtWithoutVerify(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

export default class TreewinClient {
  /**
    * @param {string} appKey
    * @param {string} appSecret
    */
  constructor(appKey, appSecret) {
    this.appKey = appKey
    this.appSecret = appSecret
  }

  /**
    * @param {string} appKey
    * @param {string} appSecret
    */
  async _getAccessToken() {
    const accessToken = await ofetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: {
        appKey: this.appKey,
        appSecret: this.appSecret,
      },
    })

    this.accessToken = accessToken
  }

  async _autorenewAccessToken() {
    if (!this.accessToken)
      await this._getAccessToken()

    // Get expiration date of the jwt
    const expDate = parseJwtWithoutVerify(this.accessToken).exp
    if (expDate < Date.now())
      await this._getAccessToken()

    return this.accessToken
  }

  async checkOrder(orderId) {
    await this._autorenewAccessToken()
    const order = await ofetch(`${process.env.TREEWIN_BASE_URL}/rest/treewin/order/check`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
      body: orderId,
    })

    return order
  }

  async createOrder(orders) {
    await this._autorenewAccessToken()
    console.log(orders)
    const order = await ofetch(`${process.env.TREEWIN_BASE_URL}/rest/treewin/order/save`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
      body: orders,
    })
    console.log(order);
    return order
  }
}
// Halilin INT GG
