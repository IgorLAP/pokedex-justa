export class ServiceUnavailableError extends Error {
  constructor () {
    super('Serviço indisponível novamente.')
    this.name = 'ServiceUnavailableError'
  }
}
