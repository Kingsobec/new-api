import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { useSetTheme, useTheme } from '../context/Theme';
import { useTranslation } from 'react-i18next';

import { API, getLogo, getSystemName, showSuccess } from '../helpers';
import { stringToColor } from '../helpers/render';
import { StyleContext } from '../context/Style/index.js';
import { StatusContext } from '../context/Status/index.js';

import fireworks from 'react-fireworks';

import {
  IconMenu,
  IconIndentLeft,
  IconUser,
  IconKey,
  IconLanguage,
} from '@douyinfe/semi-icons';
import { Avatar, Button, Dropdown, Switch, Tag } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';

const HeaderBar = () => {
  const { t, i18n } = useTranslation();
  const [userState, userDispatch] = useContext(UserContext);
  const [styleState, styleDispatch] = useContext(StyleContext);
  const [statusState] = useContext(StatusContext);
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const systemName = getSystemName();
  const logo = getLogo();
  const theme = useTheme();
  const setTheme = useSetTheme();

  const currentDate = new Date();
  const isNewYear = currentDate.getMonth() === 0 && currentDate.getDate() === 1;
  const isSelfUseMode = statusState?.status?.self_use_mode_enabled || false;
  const docsLink = statusState?.status?.docs_link || '';
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;

  async function logout() {
    await API.get('/api/user/logout');
    showSuccess(t('注销成功!'));
    userDispatch({ type: 'logout' });
    localStorage.removeItem('user');
    navigate('/login');
  }

  const handleNewYearClick = () => {
    fireworks.init('root', {});
    fireworks.start();
    setTimeout(() => {
      fireworks.stop();
      setTimeout(() => {
        window.location.reload();
      }, 10000);
    }, 3000);
  };

  useEffect(() => {
    document.body.setAttribute('theme-mode', theme === 'dark' ? 'dark' : '');
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.contentWindow.postMessage({ themeMode: theme }, '*');
    }
  }, [theme]);

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLang(lng);
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.contentWindow.postMessage({ lang: lng }, '*');
      }
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, [i18n]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className='bg-background h-[70px] w-full '>
      <div className='px-[5%] mx-auto h-full flex items-center justify-between'>
        {/* Logo and System Name */}
        <div className='flex items-center gap-3'>
          <span className='text-primary text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text'>
            {systemName}
          </span>
          {(isSelfUseMode || isDemoSiteMode) && (
            <Tag color={isSelfUseMode ? 'purple' : 'blue'} size='small'>
              {isSelfUseMode ? t('自用模式') : t('演示站点')}
            </Tag>
          )}
        </div>

        {/* Nav Links */}
        <div className='hidden md:flex items-center space-x-6 text-md font-medium'>
          <Link to='/' className='text-foreground hover:text-primary'>
            {t('首页')}
          </Link>
          <Link to='/detail' className='text-foreground hover:text-primary'>
            {t('控制台')}
          </Link>
          <Link to='/pricing' className='text-foreground hover:text-primary'>
            {t('定价')}
          </Link>
          {docsLink && (
            <a
              href={docsLink}
              target='_blank'
              rel='noopener noreferrer'
              className='text-foreground hover:text-primary'
            >
              {t('文档')}
            </a>
          )}
          <Link to='/about' className='text-foreground hover:text-primary'>
            {t('关于')}
          </Link>
        </div>

        {/* Right Side Controls */}
        <div className='flex items-center gap-3'>
          {isNewYear && (
            <Dropdown
              position='bottomRight'
              render={
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleNewYearClick}>
                    🎉 Happy New Year!!!
                  </Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Button theme='borderless'>🎉</Button>
            </Dropdown>
          )}

          <Switch
            checkedText='🌞'
            uncheckedText='🌙'
            size={styleState.isMobile ? 'default' : 'large'}
            checked={theme === 'dark'}
            onChange={(checked) => setTheme(checked)}
          />

          <Dropdown
            position='bottomRight'
            render={
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleLanguageChange('zh')}
                  type={currentLang === 'zh' ? 'primary' : 'tertiary'}
                >
                  中文
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleLanguageChange('en')}
                  type={currentLang === 'en' ? 'primary' : 'tertiary'}
                >
                  English
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleLanguageChange('ja')}
                  type={currentLang === 'ja' ? 'primary' : 'tertiary'}
                >
                  日本語
                </Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <Button icon={<IconLanguage />} theme='borderless' />
          </Dropdown>

          {userState.user ? (
            <Dropdown
              position='bottomRight'
              render={
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logout}>{t('退出')}</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <div className='flex items-center cursor-pointer'>
                <Avatar
                  size='small'
                  color={stringToColor(userState.user.username)}
                  className='shadow-sm'
                >
                  {userState.user.username[0]}
                </Avatar>
                {!styleState.isMobile && (
                  <Text className='ml-2 font-medium'>
                    {userState.user.username}
                  </Text>
                )}
              </div>
            </Dropdown>
          ) : (
            <>
              <Link to='/login'>
                <button className='border-2 border-primary text-primary rounded-full px-4 py-1.5 text-sm font-medium'>
                  {t('登录')}
                </button>
              </Link>
              {!isSelfUseMode && (
                <Link to='/register'>
                  <button className='bg-primary text-white rounded-full px-4 py-1.5 text-sm font-bold'>
                    {t('注册')}
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderBar;
