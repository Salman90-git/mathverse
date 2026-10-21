/**
 * @fileoverview Shared localStorage helper for MathVerse.
 * All read/write operations are wrapped in try/catch so a storage
 * quota error or a corrupted value never crashes the app.
 */

/**
 * Retrieve a JSON-parsed value from localStorage.
 * @template T
 * @param {string} key
 * @param {T} [defaultValue] - Returned when the key is absent or parsing fails.
 * @returns {T}
 */
export function storageGet(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

/**
 * Serialize a value to JSON and write it to localStorage.
 * @param {string} key
 * @param {*} value
 * @returns {boolean} true on success, false on failure (e.g. quota exceeded).
 */
export function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove a key from localStorage.
 * @param {string} key
 */
export function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // silently ignore
  }
}

/**
 * Merge a partial update into an existing stored object.
 * @param {string} key
 * @param {Record<string, *>} partial
 */
export function storageMerge(key, partial) {
  const existing = storageGet(key, {});
  storageSet(key, { ...existing, ...partial });
}

// ─── App-specific storage keys ────────────────────────────────────────────────
export const KEYS = {
  THEME:           'mv_theme',
  QUIZ_SCORES:     'mv_quiz_scores',
  QUIZ_STREAK:     'mv_quiz_streak',
  QUIZ_LAST_DATE:  'mv_quiz_last_date',
  FAVORITES:       'mv_favorites',
  PROGRESS:        'mv_progress',
};
