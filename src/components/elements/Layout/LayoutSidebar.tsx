import { Box, Divider, TabList, Tabs, Text, Button, Stack } from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutTab } from './LayoutTab'

import { DiAndroid } from 'react-icons/di';
import { FaCircle } from 'react-icons/fa';
import { TbStarsFilled } from "react-icons/tb";


//import { t } from '../../../change';

//import { useTranslation } from "react-i18next";
/*
export const FooBarPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      {t("Dashboard")}
    </>
  )
}
*/

import React from 'react';
import i18n, { changeLanguage } from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'IoT Hydroponics': 'IoT Hydroponics',
        },
      },
      ja: { 
        translation: {
          'IoT Hydroponics' : '水耕栽培システム',
        },
      }
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

  const App: React.FC = () => {
    const { t } = useTranslation();
    /*const onClickChangeLanguage = () => {
      i18n.changeLanguage(i18n.language === 'en' ? 'ja' : 'en')
    };*/

    return <h2>{t('welcome to React')}</h2>
  };
  export default App;




type PathName = '' | 'temperature' | 'water_temperature' | 'co2' | 'humidity' | 'ec' | 'control'

export const LayoutSidebar = () => {

  
  const buttonAlert = () => {
    alert('clicked');
  }
  const onClickChangeLanguage = () => {
    changeLanguage(i18n.language === 'en' ? 'ja' : 'en');
  }

  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const revertPath = (currentPath: PathName) => {

    const pathName = currentPath.slice(1)
    switch (pathName) {
      case '':
        return 0
      case 'temperature':
        return 1
      case 'water_temperature':
        return 2
      case 'humidity':
        return 3
      case 'ec':
        return 4
      case 'co2':
        return 5
      case 'control':
        return 6
      case 'datastorage':
        return 7
      default:
        return 0
    }
  }
  const convertPath = (index: number) => {
    switch (index) {
      case 0:
        return ''
      case 1:
        return 'temperature'
      case 2:
        return 'water_temperature'
      case 3:
        return 'humidity'
      case 4:
        return 'ec'
      case 5:
        return 'co2'
      case 6:
        return 'control'
      case 7:
        return 'datastorage'
      default:
        return ''
    }
  }
  const { t } = useTranslation();
  return (
    <Box h={'100vh'} w={'240px'} shadow={'xl'} position={'fixed'} zIndex={'3'}>
      <Text
        w={'100%'}
        textAlign={'center'}
        py={4}
        fontWeight={'800'}
        fontSize={'xl'}
      >
        <Link to='/'>{t('IoT Hydroponics')}</Link>
      </Text>
      <Stack spacing={'5%'} direction='row' align='right'>
        <Button
        leftIcon={<FaCircle />}
        colorScheme='red'
        size='xs'
        variant='outline'
        onClick={onClickChangeLanguage}
        //onClick={buttonAlert}
            /*onClick={()=>
              dispatch({
                type: CHANGE_LANG,
                payload: { lang: state.lang}
              })}*/>
          "japan"
        </Button>
        <Button
        leftIcon={<TbStarsFilled />}
        colorScheme='blue'
        size='sm'
        variant='outline'
        onClick={() => navigate('/')}
            /*onClick={()=>
              dispatch({
                type: CHANGE_LANG,
                payload: { lang: state.lang}
              })}*/>
          "english"
        </Button>
      </Stack>
      <Box display={'flex'} justifyContent={'center'}>
        <Divider w={'152.82px'} opacity={1}/>
      </Box>
      <Box mt={'32px'} w={'100%'} display={'flex'} justifyContent={'center'}>
        <Tabs
          defaultIndex={revertPath(currentPath as PathName)}
          orientation={'vertical'}
          variant={'unstyled'}
          onChange={(index) => navigate(`/${convertPath(index)}`)}
        >
          <TabList>
            <LayoutTab>Dashboard</LayoutTab> {/*Dashboard*/}
            <Divider opacity={1}/>
            <LayoutTab>温度</LayoutTab> {/*Temperature*/}
            <LayoutTab>水温</LayoutTab> {/*Water Temp*/}
            <LayoutTab>湿度</LayoutTab> {/*Humidity*/}
            <LayoutTab>EC</LayoutTab>
            <LayoutTab>
              CO<sub>2</sub>
            </LayoutTab>
            <Divider opacity={1}/>
            <LayoutTab>コントロール</LayoutTab> {/*Control*/}
            <LayoutTab>データ保管庫</LayoutTab>
          </TabList>
        </Tabs>
        
      </Box>
    </Box>
  )
}