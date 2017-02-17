import angular from 'angular';
import components from './components';
import services from './services';
import 'normalize.css';


const app = angular.module('redteal', [
  components,
  services
]);

app.constant('apiUrl', process.env.API_URL != null ? process.env.API_URL : 'http://api.geonames.org');