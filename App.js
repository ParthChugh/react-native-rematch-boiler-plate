/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import { openDatabase } from 'react-native-sqlite-storage';
import store from './store';
import Container from './Container';
import FlashMessage from 'react-native-flash-message';
import './src/constants/colors';
import './src/constants/typography';
import './src/assets/images';
import './MockData';

const db = openDatabase({ name: 'AdCast.db' });

const App = () => {
  const getData = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='messages'",
        [],
        function (tx, res) {
          console.log('itemitem::', JSON.stringify(res));
          if (res.rows.length === 0) {
            tx.executeSql('DROP TABLE IF EXISTS messages', [], () => {
              console.log('table dropped')
            });
            tx.executeSql(
              `
                CREATE TABLE IF NOT EXISTS messages(
                  _id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  text VARCHAR(255),
                  toUserId integer,
                  createdAt Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                  isSent boolean
                )
              `,
              [],
              () => {
                console.log('table created')
              }
            );
            // txn.executeSql(
            //   `INSERT INTO messages (text, fromUserId, toUserId, createdAt, receivedOn, readOn) VALUES (?,?,?,?,?)`,
            //   [
            //     "Hello", 
            //     10, 
            //     31, 
            //     new Date(Date.UTC(2020, 1, 12, 17, 20, 0)), 
            //     new Date(Date.UTC(2020, 1, 12, 17, 20, 0)), 
            //     new Date(Date.UTC(2020, 1, 12, 17, 20, 0))
            //   ]              
            // );
            // console.log('table inserted table')
            // txn.executeSql(
            //   `INSERT INTO messages (text, fromUserId, toUserId, createdAt, receivedOn, readOn) VALUES (?,?,?,?,?)`,
            //   ["Hi", 10, 31, new Date(Date.UTC(2020, 1, 12, 17, 20, 0)), new Date(Date.UTC(2020, 1, 12, 17, 20, 0)), new Date(Date.UTC(2020, 1, 12, 17, 20, 0))],              
            // );
            // txn.executeSql(
            //   `INSERT INTO messages (text, fromUserId, toUserId, createdAt, receivedOn, readOn) VALUES (?,?,?,?,?)`,
            //   ["Let's booze", 10, 31, new Date(Date.UTC(2020, 1, 12, 17, 20, 0)), new Date(Date.UTC(2020, 1, 12, 17, 20, 0)), new Date(Date.UTC(2020, 1, 12, 17, 20, 0))],              
            // );
          }
        }  
      );
    });
  }
  
  useEffect(() => {
    getData()
  },[])
  return (
    <MenuProvider>
      <React.StrictMode>
        <Provider store={store}>
          <StatusBar barStyle={'dark-content'} backgroundColor="white" />
          <Container />
          <FlashMessage position="top" />
        </Provider>
      </React.StrictMode>
    </MenuProvider>
  );
};

export default App;
