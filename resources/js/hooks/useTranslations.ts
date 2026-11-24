import { usePage } from '@inertiajs/react';

export function useTranslations(namespace?: string) {
    const { translations } = usePage().props as any;
    const t = (key: string): string => {
        const fullKey = namespace ? `${namespace}.${key}` : key;
        return translations?.[fullKey] ?? fullKey;
    };
    t.raw = (key: string): string => t(key);
    return t;
}

export function useLocale() {
    const { locale } = usePage().props as any;
    return locale || 'en';
}
