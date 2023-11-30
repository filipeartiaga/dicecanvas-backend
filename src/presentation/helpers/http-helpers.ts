import { ServerError } from '../errors/server-error'
import { UserNotVerifiedError } from '../errors/user-not-verified-error'
import { HttpResponse } from '../protocols/http'

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export const userNotVerified = (): HttpResponse => {
  return {
    statusCode: 403,
    body: new UserNotVerifiedError()
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const userNotFound = (error: Error): HttpResponse => {
  return {
    statusCode: 401,
    body: error
  }
}

export const unauthorized = (error: Error): HttpResponse => {
  return {
    statusCode: 403,
    body: error
  }
}
