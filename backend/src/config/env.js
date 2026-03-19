import dotenv from 'dotenv';
import logger from './logger.js';

// Charge les variables d'environnement depuis un fichier .env (si présent)
dotenv.config();

const maskSecret = (value) => {
  if (value === undefined || value === null || value === '') return '[NOT SET]';
  const str = String(value);
  if (str.length <= 4) return '*'.repeat(str.length);
  return `${str.slice(0, 2)}${'*'.repeat(Math.max(0, str.length - 4))}${str.slice(-2)}`;
};

/**
 * Read an environment variable with support for defaults, alternatives and masking.
 * @param {string} key The primary environment variable name.
 * @param {Object} options
 * @param {string} [options.defaultValue] Default value if the env var is not set.
 * @param {boolean} [options.required] Whether the env var must be set (logs warning if missing).
 * @param {boolean} [options.secret] Whether the value is a secret (mask output).
 * @param {string[]} [options.alternatives] Alternative env var names to read from.
 * @returns {{ value: string|undefined, usedDefault: boolean, inputName: string }}
 */
export function getEnv(key, { defaultValue, required = false, secret = false, alternatives = [] } = {}) {
  const candidates = [key, ...(alternatives || [])];
  let value;
  let inputName;

  for (const candidate of candidates) {
    const v = process.env[candidate];
    if (v !== undefined && v !== '') {
      value = v;
      inputName = candidate;
      break;
    }
  }

  const usedDefault = value === undefined || value === '';
  if (usedDefault) {
    value = defaultValue;
    inputName = key;
  }

  const displayValue = secret ? maskSecret(value) : value;
  const status = usedDefault ? 'DEFAULT' : 'SET';

  if (required && (value === undefined || value === '')) {
    logger.warn(`🔐 Env var missing: ${key} (required)`);
  }

  return { value, inputName, displayValue, status };
}

/**
 * Log a list of environment variables with masking for secrets.
 * @param {Array<{key: string, secret?: boolean, defaultValue?: string, required?: boolean, alternatives?: string[]}>} vars
 */
export function logEnv(vars) {
  const lines = vars.map((v) => {
    const { key, secret = false, defaultValue, required = false, alternatives } = v;
    const { displayValue, status, inputName } = getEnv(key, {
      defaultValue,
      required,
      secret,
      alternatives,
    });
    const note = inputName && inputName !== key ? `${status} (from ${inputName})` : status;
    return `  • ${key.padEnd(20)} : ${displayValue} ${note}`;
  });

  logger.info('🔐 Environment variables (masked):\n' + lines.join('\n'));
}
