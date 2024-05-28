import {getLocales} from 'react-native-localize';
// if English isn't your default language, move Translations to the appropriate language file.
import en, {Translations} from './en';
import {I18n} from 'i18n-js';
import fr from './fr';

// to use regional locales use { "en-US": enUS } etc
// i18n.translations = {en, 'en-US': en, fr};
const i18n = new I18n({en, 'en-US': en, fr});

i18n.enableFallback = true;

const fallbackLocale = 'en-US';
const systemLocale = getLocales()[0];
const systemLocaleTag = systemLocale?.languageTag ?? 'en-US';

if (Object.prototype.hasOwnProperty.call(i18n.translations, systemLocaleTag)) {
  // if specific locales like en-FI or en-US is available, set it
  i18n.locale = systemLocaleTag;
} else {
  // otherwise try to fallback to the general locale (dropping the -XX suffix)
  const generalLocale = systemLocaleTag.split('-')[0];
  if (Object.prototype.hasOwnProperty.call(i18n.translations, generalLocale)) {
    i18n.locale = generalLocale;
  } else {
    i18n.locale = fallbackLocale;
  }
}
/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>;

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `['${TKey}']` | `.${TKey}`>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
    ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
    : Text;
