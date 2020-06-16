import { Controller, HttpRequest, HttpResponse, LoadCashback } from './load-cashback-controller-protocols'
import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'

export class LoadCashbackController implements Controller {
  constructor (
    private readonly cashbackLoad: LoadCashback
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { itr } = httpRequest.params
      const cashback = await this.cashbackLoad.load(itr)
      return cashback ? ok(cashback) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}