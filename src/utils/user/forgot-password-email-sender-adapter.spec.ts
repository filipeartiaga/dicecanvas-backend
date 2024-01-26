import { FirstAccessEmailSenderAdapter } from './first-access-email-sender-adapter'

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {})
  })
}))

describe('Forgot Password Email Sender Adapter', () => {
  test('Should send an email on success ', async () => {
    const options = {
      from: 'from@email.com',
      to: 'to@email.com',
      text: 'My Message!'
    }

    const sut = new FirstAccessEmailSenderAdapter()
    const response = await sut.sendMail(options.to, options.text)
    expect(response).toBeTruthy()
  })
})
