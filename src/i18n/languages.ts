export interface Language {
    code: string;
    label: string;
    countryCode: string;
}

export const LANGUAGES: Language[] = [
    { code: 'en', label: 'English', countryCode: 'GB' },
    { code: 'ru', label: 'Русский', countryCode: 'RU' },
    { code: 'me', label: 'Crnogorski', countryCode: 'ME' },
];

export const LANGUAGE_CODES = LANGUAGES.map((lang) => lang.code);
