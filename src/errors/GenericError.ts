export class GenericError extends Error {
  constructor(err: unknown) {
    super(JSON.stringify(err));
    Object.setPrototypeOf(this, GenericError.prototype);
  }
}
