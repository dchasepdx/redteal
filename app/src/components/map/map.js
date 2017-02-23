import template from './map.html';

export default {
  template,
  controller
};

controller.$inject = ['geonamesService', '$timeout'];

function controller(geonamesService) {

  this.earthquakeMarkers = [];

  this.$onInit = () => {
    this.initialize = () => {
      this.geocoder = new google.maps.Geocoder();//eslint-disable-line
      this.map = new google.maps.Map(document.getElementById('gMap'), {//eslint-disable-line
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    };
    google.maps.event.addDomListener(window, 'load', this.initialize);//eslint-disable-line   
  };

  this.getEarthquakes = () => {
    geonamesService.getEarthquakes(this.n,this.s,this.e,this.w).then(earthquakes => {
      this.earthquakes = earthquakes.earthquakes;
      if(this.earthquakes.length > 0) {
        this.error = '';
        if(this.earthquakeMarkers.length > 0) {
          for(let i = 0; i < this.earthquakeMarkers.length; i++) {
            this.earthquakeMarkers[i].setMap(null);
          }
          this.earthquakeMarkers = [];
        }
        for(let i = 0; i < this.earthquakes.length; i++) {
          this.earthquakeMarker = new google.maps.Marker({//eslint-disable-line
            map: this.map,
            position: new google.maps.LatLng(this.earthquakes[i].lat, this.earthquakes[i].lng)//eslint-disable-line
          });
          this.earthquakeMarkers.push(this.earthquakeMarker);
        }
      } else {
        this.error = 'No earthquakes in region';
      }
    })
      .catch(() => {
        console.log('wtf');
      });
  };


  this.cityMarker = () => {
    let address = this.address;
    this.geocoder.geocode({address}, (results, status) => {
      if (status == 'OK') {
        let bounds = results[0].geometry.bounds;
        this.n = bounds.f.b;
        this.s = bounds.f.f;
        this.e = bounds.b.b;
        this.w = bounds.b.f;

        // -122.83699519999999 b.b
        // -122.4718489 b.f
        // 45.654424 f.b
        // 45.432393 f.f


        if(this.marker) {
          this.marker.setMap(null);
        }
        if(this.rectangle) {
          this.rectangle.setMap(null);
        }
        this.map.setCenter(results[0].geometry.location);
        this.marker = new google.maps.Marker({//eslint-disable-line
          map: this.map,
          position: results[0].geometry.location
        });
        this.rectangle = new google.maps.Rectangle({//eslint-disable-line
          strokeColor: '#FF0000',
          strokeWeight: 2,
          map: this.map,
          bounds: results[0].geometry.bounds
        });
        this.getEarthquakes();
      } else {
        this.error = ('Geocode was not successful for the following reason: ' + status);
      }
    });       
  };
}

