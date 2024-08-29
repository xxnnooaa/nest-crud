import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/orders.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductsService } from '../products/products.service'

@Injectable()
export class OrdersService {
  constructor (
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productService: ProductsService,
    ) {}
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // const productObjectIds = createOrderDto.productIds.map(id => new Types.ObjectId(id));
    // const newOrder = new this.orderModel({
    //   customerName: createOrderDto.customerName,
    //   productIds: productObjectIds,
    // });
    // return newOrder.save();
    const product = await this.productService.findOne(createOrderDto.productId)
    // const product = createOrderDto.productId.map(id =>  new Types.ObjectId(createOrderDto.productId))
    if (!product) {
      throw new NotFoundException ('product not found');
    }
    // const newOrder = new this.orderModel({
    //   productId: createOrderDto.productId,
    //   quantity: createOrderDto.quantity,
    // })
    const result = new this.orderModel(createOrderDto)
    return result.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('productId').exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = this.orderModel.findById(id).populate('productId').exec();
    return order;
  }

}
