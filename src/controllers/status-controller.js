// This is initialized during server start
const start = new Date()

export default {

  getStatus(ctx) {
    ctx.status = 200
    ctx.body = {
      start,
      version: '1.0',
    }
  },

}
