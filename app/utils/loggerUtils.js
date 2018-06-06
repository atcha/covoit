import LOGGER from './logger';

export function logCalls(target, key, descriptor) {
    const original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = function (...args) {
            LOGGER.debug(`[${args[0].user.displayName}] - ${key}`);
            try {
                return original.apply(this, args);
            } catch (e) {
                console.log(`Error: ${e}`);
            }
        }
    }
    return descriptor;
}