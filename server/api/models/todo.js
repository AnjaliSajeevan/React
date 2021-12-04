import Mongoose from "mongoose";

const todoSchema = new Mongoose.Schema(
    {
        title: {
            type: String,
            required: "title is a required."
        },
        description: {
            type: String,
            required: "description is a required."
        },
        dueDate:{
            type: Date,
            required:"due date is required"
        },
        time:{
            type:String,
            required:"time is required"
        },
        check:{
            type:Boolean,
            default: false
        }

    },
    {
        versionKey: false,
        
    });

todoSchema.virtual("id", () => this._id.toHexString());
todoSchema.set("toJSON", { virtuals: true });

const todo = Mongoose.model("todo", todoSchema);

export default todo;
