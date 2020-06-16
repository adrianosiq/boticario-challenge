import { AddOrder, AddOrderModel, OrderModel, GetStatusHelper, GetCashbackHelper, AddOrderRepository } from './db-add-order-protocols'

export class DbAddOrder implements AddOrder {
  constructor (
    private readonly status: GetStatusHelper,
    private readonly cashback: GetCashbackHelper,
    private readonly addOrderRepository: AddOrderRepository
  ) {}

  async add (orderData: AddOrderModel): Promise<OrderModel> {
    const status = await this.status.get(orderData.itr)
    const { cashbackPerc, cashbackValue } = await this.cashback.get(orderData.value)
    const order = await this.addOrderRepository
      .add(Object.assign({}, orderData, { status: status, cashbackPerc: cashbackPerc, cashbackValue: cashbackValue }))
    return order
  }
}
