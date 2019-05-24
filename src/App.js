import React from 'react';
import Root from './UI/Root';
import configureStore from './utils/redux/configureStore';
export default () => (<Root store={configureStore()} />);