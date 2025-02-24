import { Router } from 'express';
import { 
    createSubscription,
    getUserSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
    cancelSubscription,
    getUpcomingRenewals,
    getAllSubscriptions

} from '../controllers/subscription.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', getAllSubscriptions);
subscriptionRouter.get('/:id', getSubscriptionById);
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', authorize, updateSubscription);
subscriptionRouter.delete('/:id', authorize, deleteSubscription);
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);
subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);
subscriptionRouter.get('/upcoming-renewals', getUpcomingRenewals);

export default subscriptionRouter;
