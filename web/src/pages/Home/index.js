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
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className='min-h-screen bg-background trans text-white font-sans px-[5%] py-[5%]'>
        {/* Hero Section */}

        <div className='bg-hero-gradient rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center relative overflow-hidden  mx-auto min-h-[500px] '>
          <div className='absolute inset-0 pointer-events-none'>
            <div className='absolute top-[50px] left-[100px] w-3 h-3 bg-primary opacity-30 rounded-full animate-float1'></div>
            <div className='absolute top-[120px] left-[200px] w-2 h-2 bg-accent opacity-40 rounded-full animate-float2'></div>
            <div className='absolute top-[170px] left-[300px] w-4 h-4 bg-accent opacity-20 rounded-full animate-float3'></div>
            <div className='absolute top-[70px] left-[400px] w-3 h-3 bg-primary opacity-30 rounded-full animate-float1'></div>
            <div className='absolute top-[150px] left-[500px] w-2 h-2 bg-accent opacity-50 rounded-full animate-float2'></div>
            <div className='absolute top-[40px] left-[600px] w-3 h-3 bg-primary opacity-40 rounded-full animate-float3'></div>
            <div className='absolute top-[90px] left-[700px] w-4 h-4 bg-accent opacity-30 rounded-full animate-float2'></div>
            <div className='absolute top-[170px] left-[800px] w-2 h-2 bg-primary opacity-20 rounded-full animate-float2'></div>
            <div className='absolute top-[50px] left-[850px] w-3 h-3 bg-accent opacity-40 rounded-full animate-float3'></div>
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

        <FeatureCards />
        <ApiCards />
      </div>
    </>
  );
};

export default Home;
