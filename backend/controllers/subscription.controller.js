import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js"
import { configDotenv } from 'dotenv';
configDotenv()


const SERVER_URL = process.env.SERVER_URL


export const getAllSubscriptions = async (req, res, next) => {
    try {
        // Filter subscriptions by the authenticated user's ID
        const subscriptions = await Subscription.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
};

export const createSubscription = async (req, res, next) => {
    try {
      const subscription = await Subscription.create({
        ...req.body,
        user: req.user._id,
      });
  
      const { workflowRunId } = await workflowClient.trigger({
        url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        body: {
          subscriptionId: subscription.id,
        },
        headers: {
          'content-type': 'application/json',
        },
        retries: 0,
      })
  
      res.status(201).json({ success: true, data: { subscription, workflowRunId } });
    } catch (e) {
      next(e);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (String(req.user.id) !== String(req.params.id)) {
            const error = new Error("You are not the owner of this account");
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
};

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if the subscription belongs to the authenticated user
        if (String(subscription.user) !== String(req.user._id)) {
            const error = new Error("You are not authorized to update this subscription");
            error.statusCode = 403;
            throw error;
        }

        // Proceed with the update
        Object.assign(subscription, req.body);
        await subscription.save();

        res.status(200).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        subscription.status = "cancelled";
        await subscription.save();

        res.status(200).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

export const getUpcomingRenewals = async (req, res, next) => {
    try {

      const subscriptions = await Subscription.find({
        user: req.user._id,
        renewalDate: { $gte: new Date() },
        status: { $ne: "cancelled" } 
      });
  
      res.status(200).json({
        success: true,
        data: subscriptions
      });
    } catch (error) {
      next(error);
    }
  };
  