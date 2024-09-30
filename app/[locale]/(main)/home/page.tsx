import { useTranslations } from 'next-intl';

import { ContentLayout } from '@/app/components';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <ContentLayout title={t('title')}>
      <div>{t('title')}</div>
    </ContentLayout>
  );
}
