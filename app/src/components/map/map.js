import template from './map.html';

export default {
  template,
  controller
};

controller.$inject = ['geonamesService'];

function controller(geonamesService) {
  this.$onInit = () => {
    geonamesService.getCity().then(cityData => {
      this.cityData = cityData;
    });
  };
}
