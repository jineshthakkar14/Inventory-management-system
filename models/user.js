const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},

		password: {
			type: String,
			required: true,
		},
		accountType: {
			type: String,
			enum: ["Admin","Customer"],
			required: true,
		},
		token: {
			type: String,
		},
        cart: [
            {
              product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
              },
              quantity: {
                type: Number,
                required: true,
                default: 1,
              },
            },
          ],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
