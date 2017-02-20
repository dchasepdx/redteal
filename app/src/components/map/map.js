import template from './map.html';

export default {
  template,
  controller
};

controller.$inject = ['geonamesService', '$timeout'];

function controller(geonamesService) {
  this.$onInit = () => {
    geonamesService.getCity().then(cityData => {
      this.cityData = cityData;
    });
    this.initialize = () => {
      this.geocoder = new google.maps.Geocoder();//eslint-disable-line
      this.map = new google.maps.Map(document.getElementById('gMap'), {//eslint-disable-line
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    };
    google.maps.event.addDomListener(window, 'load', this.initialize);//eslint-disable-line   
  };

  this.cityMarker = () => {
    let address = this.address;
    console.log(address);

    this.geocoder.geocode({address}, (results, status) => {
      if (status == 'OK') {
        this.map.setCenter(results[0].geometry.location);
        this.marker = new google.maps.Marker({//eslint-disable-line
          map: this.map,
          position: results[0].geometry.location
        });
      } else {
        this.error = ('Geocode was not successful for the following reason: ' + status);
      }
    }); 

    this.marker = new google.maps.Marker({//eslint-disable-line
      position: this.myLatlng,
      map: this.map,
      draggable: true
    });
  };
}

