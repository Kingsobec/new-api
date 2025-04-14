import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from '@douyinfe/semi-ui';
import { API, showError, showNotice, timestamp2string } from '../../helpers';
import { StatusContext } from '../../context/Status';
import { marked } from 'marked';
import { StyleContext } from '../../context/Style/index.js';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FeatureCards from '../../components/FeatureCards.js';
import ApiCards from '../../components/ApiCards.js';

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useState(
    document.body.classList.contains('dark'),
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark'));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className='min-h-screen bg-background trans text-white font-sans px-[5%] py-[5%] overflow-hidden'>
        <div className='w-[100px] h-[100px] bg-primary blur-3xl absolute animate-filter1 z-0'></div>
        <div className='w-[100px] h-[100px] bg-primary blur-3xl absolute animate-filter2 z-0'></div>
        <div className='w-[100px] h-[100px] bg-primary blur-3xl absolute animate-filter3 z-0'></div>
        {/* Hero Section */}

        <div
          className={`rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center relative overflow-hidden trans mx-auto min-h-[500px] ${isDark ? 'bg-[linear-gradient(to_bottom,#252738,#1D1F31)]' : 'bg-[linear-gradient(to_bottom,#ffffff,#4A9FFF11)]'} `}
        >
          <div className='absolute inset-0 pointer-events-none'>
            <div className='absolute top-[200px] left-[10%] w-5 h-5 bg-primary opacity-30 rounded-full animate-float1'></div>
            <div className='absolute top-[120px] left-[10%] w-4 h-4 bg-accent opacity-40 rounded-full animate-float2'></div>
            <div className='absolute top-[170px] left-[30%] w-4 h-4 bg-accent opacity-20 rounded-full animate-float3'></div>
            <div className='absolute top-[470px] left-[40%] w-5 h-5 bg-primary opacity-30 rounded-full animate-float1'></div>
            <div className='absolute top-[150px] left-[50%] w-4 h-4 bg-accent opacity-50 rounded-full animate-float2'></div>
            <div className='absolute top-[140px] left-[50%] w-5 h-5 bg-primary opacity-40 rounded-full animate-float3'></div>
            <div className='absolute top-[390px] left-[70%] w-4 h-4 bg-accent opacity-30 rounded-full animate-float2'></div>
            <div className='absolute top-[270px] left-[80%] w-4 h-4 bg-primary opacity-20 rounded-full animate-float2'></div>
            <div className='absolute top-[150px] left-[90%] w-5 h-5 bg-accent opacity-40 rounded-full animate-float3'></div>
          </div>

          <div className='md:w-1/2 z-10 mb-10 md:mb-0'>
            <p className='font-bold text-foreground text-4xl'>
              {t('home.hero.title')}
            </p>
            <p className=' text-muted mb-4 text-2xl'>
              {t('home.hero.subtitle')}
            </p>
            <p className='text-muted'>{t('home.hero.description')}</p>

            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 gap-8'>
              <button className='bg-[linear-gradient(to_right,#4A9FFF,#3D72E4)] text-foreground font-bold py-3 px-6 rounded-full'>
                {t('home.hero.getStarted')}
              </button>
              <button className='border-2 border-primary text-primary font-medium py-3 px-6 rounded-full'>
                {t('home.hero.viewDocs')}
              </button>
            </div>
          </div>

          <div className='md:w-2/5 ml-auto z-10'>
            <div className='bg-secondary rounded-xl p-6 opacity-90'>
              <pre className='text-sm'>
                <code>
                  <span className='text-primary'>import requests</span>
                  {'\n'}
                  <span className='text-muted'>
                    url = "https://api.aimlapi.com/v1/text-generation"
                  </span>
                  {'\n'}
                  <span className='text-muted'>
                    headers = {'{'}"Authorization": "Bearer YOUR_API_KEY"{'}'}
                  </span>
                  {'\n'}
                  <span className='text-muted'>
                    data = {'{'}"prompt": "Hello, I am", "max_tokens": 50{'}'}
                  </span>
                  {'\n'}
                  <span className='text-muted'>
                    response = requests.post(url, headers=headers, json=data)
                  </span>
                  {'\n'}
                  <span className='text-muted'>print(response.json())</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className='z-50'>
          <FeatureCards />
          <ApiCards />
        </div>
      </div>
    </>
  );
};

export default Home;
