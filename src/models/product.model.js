const {Schema, model} = require('mongoose');

const productSchema = new Schema(
    {
    name :{ type : 'string', required: true},
    price :{ type : 'number', required: true}
    },
    {
        versionKey:false,
        timestamps:true,
    }
    );

module.exports = model("product" , productSchema);