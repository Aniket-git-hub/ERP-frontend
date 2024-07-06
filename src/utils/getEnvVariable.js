import.meta.env;

function getEnvVariable(variableName) {
    const env = import.meta.env.MODE || 'development';
    const prefixedVariableName = `VITE_${env.toUpperCase()}_${variableName}`;

    const value = import.meta.env[prefixedVariableName];

    if (value === undefined) {
        throw new Error(
            `Environment variable ${prefixedVariableName} is not defined.`
        );
    }

    return value;
}

export default getEnvVariable;
