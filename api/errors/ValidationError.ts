import BaseError from "./BaseError";

export default class ValidationError extends BaseError {
    constructor(e) {
        super(e.message, 400);
    }
}
