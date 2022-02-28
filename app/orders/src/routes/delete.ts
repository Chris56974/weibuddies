import { Router, Request, Response } from 'express';
import { requireAuth, NotFoundError, NotAuthorizedError, OrderStatus } from '@weibuddies/common';
import { Order } from '../models/Order/interface';
import { OrderCancelledPublisher } from '../events/publishers/OrderCancelledPublisher';
import { natsWrapper } from '../NatsWrapper';

const router = Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    order.status = OrderStatus.Cancelled;
    await order.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      product: {
        id: order.product.id,
      },
    });

    return res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
