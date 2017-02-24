import angular from 'angular';
import components from './components';
import services from './services';
import 'normalize.css';
import './scss/main.scss';

const app = angular.module('map-project', [
  components,
  services,

]);

app.constant('apiUrl', process.env.API_URL != null ? process.env.API_URL : 'http://api.geonames.org');
