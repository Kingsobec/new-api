import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const ApiCard = ({ abbreviation, titleKey, descKeys, badgeKey }) => {
  const { t } = useTranslation();

  return (
    <div className='bg-secondary rounded-xl p-5'>
      <div className='flex items-start mb-4'>
        <div className='h-10 w-10 bg-dark rounded-lg border-2 border-primary flex items-center justify-center mr-3'>
          <span className='text-primary font-medium'>{abbreviation}</span>
        </div>
        <div>
          <h3 className='text-base font-bold text-foreground'>{t(titleKey)}</h3>
          {descKeys.map((descKey, i) => (
            <p key={i} className='text-sm text-muted'>
              {t(descKey)}
            </p>
          ))}
        </div>
      </div>
      <div className='mt-4'>
        <span className='bg-dark text-primary text-xs px-4 py-1 rounded-full'>
          {t(badgeKey)}
        </span>
      </div>
    </div>
  );
};

const ApiCards = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const apis = [
    {
      abbreviation: 'AI',
      titleKey: 'home.apis.textGeneration.title',
      descKeys: [
        'home.apis.textGeneration.desc1',
        'home.apis.textGeneration.desc2',
      ],
      badgeKey: 'home.apis.textGeneration.badge',
    },
    {
      abbreviation: 'CV',
      titleKey: 'home.apis.imageRecognition.title',
      descKeys: [
        'home.apis.imageRecognition.desc1',
        'home.apis.imageRecognition.desc2',
      ],
      badgeKey: 'home.apis.imageRecognition.badge',
    },
    {
      abbreviation: 'TL',
      titleKey: 'home.apis.translation.title',
      descKeys: ['home.apis.translation.desc1', 'home.apis.translation.desc2'],
      badgeKey: 'home.apis.translation.badge',
    },
    {
      abbreviation: 'SP',
      titleKey: 'home.apis.speech.title',
      descKeys: ['home.apis.speech.desc1', 'home.apis.speech.desc2'],
      badgeKey: 'home.apis.speech.badge',
    },
  ];

  // Filter APIs based on search query
  const filteredApis = apis.filter((api) => {
    const query = searchQuery.toLowerCase();
    const title = t(api.titleKey).toLowerCase();
    const abbreviation = api.abbreviation.toLowerCase();
    const badge = t(api.badgeKey).toLowerCase();

    return (
      title.includes(query) ||
      abbreviation.includes(query) ||
      badge.includes(query)
    );
  });

  return (
    <section className='my-16'>
      <h2 className='text-3xl font-bold text-foreground text-center mb-6'>
        {t('home.apis.title')}
      </h2>

      {/* Search Bar */}
      <div className='flex justify-center mb-10'>
        <div className='relative w-full max-w-[500px]'>
          <input
            type='text'
            placeholder={t('home.apis.search')}
            className='w-full bg-secondary border border-border rounded-full py-2.5 px-5 text-muted'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='text-muted'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
          </div>
        </div>
      </div>

      {/* API Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5'>
        {filteredApis.length > 0 ? (
          filteredApis.map((api, index) => (
            <ApiCard
              key={index}
              abbreviation={api.abbreviation}
              titleKey={api.titleKey}
              descKeys={api.descKeys}
              badgeKey={api.badgeKey}
            />
          ))
        ) : (
          <p className='text-center text-muted col-span-full'>
            {t('home.apis.noResults')}
          </p>
        )}
      </div>
    </section>
  );
};

export default ApiCards;
