
import { useTranslation } from 'react-i18next';

const FeatureCard = ({ icon, titleKey, descKeys }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-secondary rounded-xl p-6 hover:scale-[102%] trans">
      <div className="flex items-start">
        <div className="h-12 w-12 bg-dark rounded-full border-2 border-primary flex items-center justify-center mr-5">
          <span className="text-2xl text-primary">{icon}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{t(titleKey)}</h3>
          {descKeys.map((descKey, i) => (
            <p key={i} className="text-sm text-muted mt-2">
              {t(descKey)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureCards = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: '🔑',
      titleKey: 'home.features.secureAuth.title',
      descKeys: [
        'home.features.secureAuth.desc1',
        'home.features.secureAuth.desc2',
        'home.features.secureAuth.desc3',
      ],
    },
    {
      icon: '⚡',
      titleKey: 'home.features.highPerformance.title',
      descKeys: [
        'home.features.highPerformance.desc1',
        'home.features.highPerformance.desc2',
        'home.features.highPerformance.desc3',
      ],
    },
    {
      icon: '💰',
      titleKey: 'home.features.flexibleBilling.title',
      descKeys: [
        'home.features.flexibleBilling.desc1',
        'home.features.flexibleBilling.desc2',
        'home.features.flexibleBilling.desc3',
      ],
    },
  ];

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-foreground text-center mb-8">{t('home.features.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            titleKey={feature.titleKey}
            descKeys={feature.descKeys}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
