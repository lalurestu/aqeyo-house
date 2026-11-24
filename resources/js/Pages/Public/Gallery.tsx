import { Section } from "@/Components/ui/Section";
import GalleryGrid from "@/Components/GalleryGrid";
import Image from "@/Components/Image";
import { useTranslations } from "@/hooks/useTranslations";
import PublicLayout from "@/Layouts/PublicLayout";

export default function Gallery() {
    const t = useTranslations('Gallery');
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/assets/img/img7.jpeg" alt="Gallery" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-4">
                        {t('heroTitle')}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        {t('heroSubtitle')}
                    </p>
                </div>
            </div>

            <Section className="bg-background pt-16">
                <div className="max-w-4xl mx-auto px-4 text-center mb-12">
                    <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-3 block">{t('overline')}</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 font-serif">{t('title')}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">{t('desc')}</p>
                </div>
                <GalleryGrid />
            </Section>
        </div>
    );
}

Gallery.layout = (page: any) => <PublicLayout children={page} title="Gallery - AQEYO House" />;
