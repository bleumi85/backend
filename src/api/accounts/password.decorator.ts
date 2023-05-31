import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function Password(validationOptions?: ValidationOptions) {
    return function(object: Record<string, any>, propertyName: string): void {
        registerDecorator({
            name: 'password',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments): boolean {
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
                    return passwordRegex.test(value);
                },
                defaultMessage(args: ValidationArguments): string {
                    return `${propertyName} must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number`;
                }
            }
        })
    }
}
