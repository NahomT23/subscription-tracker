import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [1, 2, 3, 5, 7];
const MAX_DELAY = 1000000; 

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for ${subscriptionId}. Stopping workflow`);
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`);
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
};

/**
 * Sleeps in intervals until the target date is reached, avoiding delays that exceed the QStash limit.
 */
const sleepUntilReminder = async (context, label, targetDate) => {
    let now = dayjs();
    let remainingDelay = targetDate.diff(now, 'millisecond');

    // Loop until the remaining delay is within the allowed maximum.
    while (remainingDelay > MAX_DELAY) {
        // Sleep for the maximum allowed delay.
        const intermediateDate = now.add(MAX_DELAY, 'millisecond');
        console.log(`Sleeping until intermediate point for ${label} at ${intermediateDate}`);
        await context.sleepUntil(`${label} (intermediate)`, intermediateDate.toDate());

        // Update the current time and remaining delay.
        now = dayjs();
        remainingDelay = targetDate.diff(now, 'millisecond');
    }

    // Sleep for the final remaining delay.
    console.log(`Sleeping until final ${label} reminder at ${targetDate}`);
    await context.sleepUntil(label, targetDate.toDate());
};

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // SEND EMAIL
    });
};
