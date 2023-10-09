import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: [true, 'Email already exists'],
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'username invalid, it must be between 8 and 20 characters long, and can only contain alphanumeric characters, and be unique'],
        image: {
            type: String,
        },
    }
});

const User = models.User || model('User', UserSchema);

export default User;
    
