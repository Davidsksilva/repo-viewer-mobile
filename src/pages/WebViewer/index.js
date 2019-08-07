import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

const WebViewer = ({ navigation }) => {
  const star = navigation.getParam('star');

  return <WebView style={{ flex: 1 }} source={{ uri: star.html_url }} />;
};

WebViewer.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('star').name,
});

WebViewer.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

export default WebViewer;
