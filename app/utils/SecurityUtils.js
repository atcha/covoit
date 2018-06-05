export function authenticated(target, key, descriptor) {
    const original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = function (...args) {
            if (!args[0].user) {
                args[1].status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
            } else {
                try {
                    return original.apply(this, args);
                } catch (e) {
                    console.log(`Error: ${e}`);
                }
            }
        }
    }
    return descriptor;
}