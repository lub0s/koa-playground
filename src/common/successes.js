class ApiSuccess {
  constructor(type, message, status, body) {
    this.name = this.constructor.name
    this.message = message
    this.type = type
    this.status = status
    this.body = body
  }


}

class Ok extends ApiSuccess {
  constructor(body, type = 'S_OK', message = 'OK.') {
    super(type, message, 200, body)
  }
}

class Created extends ApiSuccess {
  constructor(body, type = 'S_CREATED', message = 'Created.') {
    super(type, message, 201, body)
  }
}

module.exports = {
  Ok,
  Created,
}
