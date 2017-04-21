// This is initialized during server start
const start = new Date()

export default {

  /**
   * Sends info about status of the server.
   * @param {Object} ctx Koa context
   * @returns {Function} Koa middleware
   */
  getStatus(ctx) {
    ctx.status = 200
    ctx.body = {
      start,
      version: '1.0',
    }
  },

}
