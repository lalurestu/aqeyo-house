'use client';

import { useLocale } from "@/hooks/useTranslations";
import { router } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';

export default function LanguageSwitcher() {
    const [isPending, setIsPending] = useState(false);
    const localActive = useLocale();

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        setIsPending(true);
        router.post(`/locale/${nextLocale}`, {}, {
            preserveScroll: true,
            onFinish: () => setIsPending(false),
        });
    };

    return (
        <label className="border-2 rounded border-gray-300">
            <p className="sr-only">Change language</p>
            <select
                value={localActive}
                className="bg-transparent py-1.5 px-3 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 cursor-pointer"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="en">🇺🇸 EN</option>
                <option value="id">🇮🇩 ID</option>
            </select>
        </label>
    );
}
