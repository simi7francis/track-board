import {CustomError} from './custom-error';

export class AlreadyBlocked extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, AlreadyBlocked.prototype);
    }

    serializeErrors() {
        return [{message: this.message}];
    }
}
