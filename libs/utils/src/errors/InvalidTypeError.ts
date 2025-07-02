export class InvalidTypeError extends Error {
  constructor(receivedType: string, expectedType: string) {
    super(`Expected ${expectedType}, but received ${receivedType}. Please check the input value.`);
    this.name = 'InvalidTypeError';
  }
}
