import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from '@douyinfe/semi-ui';
import { API, showError, showNotice, timestamp2string } from '../../helpers';
import { StatusContext } from '../../context/Status';
import { marked } from 'marked';
import { StyleContext } from '../../context/Style/index.js';
import { useTranslation } from 'react-i18next';

const Home = () => {
  //开始使用
  //了解更多
  const { t, i18n } = useTranslation();
  return (
    <>
      <div>
        <div>
          <p
            style={{
              fontSize: '100px',
              fontFamily: 'PingFang SC',
              fontWeight: 600,
              textAlign: 'center',
              lineHeight: '100%',
            }}
          >
            New API <br />
            {t('200+ AI 模型')} <br /> {t('正常运行时间 99%')} <br />
            <span style={{ fontSize: '30px', fontWeight: '400' }}>
              {t('通过我们的安全 API 集成 AI 功能')}
            </span>
          </p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              theme='solid'
              style={{ padding: '40px', margin: "10px", fontSize: '50px' }}
              type={'primary'}
              size='large'
            >
              {t('开始使用')}
            </Button>
            <Button
              theme='solid'
              style={{ padding: '40px', margin: "10px", fontSize: '50px' }}
              type={'secondary'}
              size='large'
            >
              {t('了解更多')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
