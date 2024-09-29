import { useTranslations } from 'next-intl';

import { ContentLayout } from '@/app/components';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <ContentLayout title="Home">
      <div>{t('title')}</div>
    </ContentLayout>
  );
}
