#!/usr/bin/env node

/**
 * Validator script to ensure 100% key parity and deduplication across i18n dictionaries:
 * - vi.json
 * - en.json
 * - km.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, '../src/i18n/locales');
const languages = ['vi', 'en', 'km'];

function loadJson(lang) {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Dictionary file missing: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function runValidation() {
  console.log('🔍 Running i18n Key Parity & Deduplication Audit...\n');

  const dicts = {};
  const allKeySets = {};

  for (const lang of languages) {
    dicts[lang] = loadJson(lang);
    allKeySets[lang] = new Set(getAllKeys(dicts[lang]));
    console.log(`✓ Loaded [${lang}.json]: ${allKeySets[lang].size} translation keys`);
  }

  const baseLang = 'vi';
  const baseKeys = Array.from(allKeySets[baseLang]);
  let hasError = false;

  for (const targetLang of ['en', 'km']) {
    const targetKeys = allKeySets[targetLang];

    // Check missing keys
    const missing = baseKeys.filter((k) => !targetKeys.has(k));
    if (missing.length > 0) {
      hasError = true;
      console.error(
        `\n❌ [${targetLang}.json] is missing ${missing.length} keys from ${baseLang}.json:`
      );
      missing.forEach((k) => console.error(`   - ${k}`));
    }

    // Check extra keys
    const extra = Array.from(targetKeys).filter((k) => !allKeySets[baseLang].has(k));
    if (extra.length > 0) {
      hasError = true;
      console.error(
        `\n❌ [${targetLang}.json] has ${extra.length} extra keys not in ${baseLang}.json:`
      );
      extra.forEach((k) => console.error(`   + ${k}`));
    }
  }

  if (hasError) {
    console.error('\n🚨 i18n Validation Failed: Key parity mismatch detected!');
    process.exit(1);
  } else {
    console.log(
      '\n🎉 SUCCESS: 100% Key Parity verified across vi, en, and km with ZERO missing or mismatched keys!'
    );
  }
}

runValidation();
