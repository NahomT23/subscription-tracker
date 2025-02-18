import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    price: {
      type: Number,
      required: [true, "Subscription Price is required"],
      min: [0, "Price must be greater than or equal to 0"],
    },
    currency: {
      type: String,
      enum: [
        "USD",
        "EUR",
        "BIRR",
        "GBP",
        "UAH",
        "PLN",
        "INR",
        "PKR",
        "AUD",
        "CAD",
        "CHF",
        "CNY",
        "JPY",
        "KRW",
        "BRL",
        "MXN",
        "RUB",
        "SEK",
        "NOK",
        "ZAR",
        "SGD",
        "HKD",
        "MYR",
        "THB",
        "IDR",
        "TRY",
        "SAR",
        "AED",
        "EGP",
        "TWD",
        "ILS",
        "CLP",
        "COP",
        "ARS",
        "PHP",
        "BHD",
        "OMR",
      ],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "education",
        "music",
        "technology",
        "business",
        "health",
        "lifestyle",
        "gaming",
        "movies",
        "fashion",
        "finance",
        "food",
        "travel",
        "parenting",
        "culture",
        "politics",
        "history",
        "religion",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date must be in the past or today",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);


// Pre-save hook to calculate renewal date
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };


    const renewalDays = renewalPeriods[this.frequency];
    if (renewalDays) {
      this.renewalDate = new Date(this.startDate);
      this.renewalDate.setDate(this.renewalDate.getDate() + renewalDays);
    }
  }


  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});


const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;