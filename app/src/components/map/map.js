import template from './map.html';

export default {
  template,
  controller
};

controller.$inject = ['geonamesService', '$timeout'];

function controller(geonamesService) {

  this.earthquakeMarkers = [];
  this.weatherMarkers = [];
  this.cityMarkers = [];
  this.earthquakeMarker;

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

  this.removeMarkers = (markers) => {
    for(let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  };

  this.addMarkers = (markerArray, marker, event, title) => {
    for(let i = 0; i < event.length; i++) {
        marker = new google.maps.Marker({//eslint-disable-line
          map: this.map,
          position: new google.maps.LatLng(event[i].lat, event[i].lng),//eslint-disable-line
          label: title[0].toUpperCase()
        });
      markerArray.push(marker);
    }
  };

  this.getEarthquakes = () => {
    geonamesService.getInfo('earthquakes',this.n,this.s,this.e,this.w).then(earthquakes => {
      this.earthquakes = earthquakes.earthquakes;
      if(this.earthquakes.length > 0) {
        this.error = '';
        if(this.earthquakeMarkers.length > 0) {
          this.removeMarkers(this.earthquakeMarkers);
        }
        this.addMarkers(this.earthquakeMarkers, this.earthquakeMarker, this.earthquakes, 'earthquake');
      } else {
        this.error = 'No earthquakes in region';
      }
    })
      .catch((err) => {
        console.log(err);
      });
  };

  this.getWeather = () => {
    geonamesService.getInfo('weather',this.n, this.s, this.e, this.w).then(weather => {
      this.weather = weather.weatherObservations;
      if(this.weather.length > 0) {
        this.error = '';
        if(this.weatherMarkers.length > 0) {
          this.removeMarkers(this.weatherMarkers);
        }
        this.addMarkers(this.weatherMarkers, this.weatherMarker, this.weather, 'weather');
      } else {
        this.error = 'No weather in region';
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  this.getCities = () => {
    geonamesService.getInfo('cities', this.n, this.s, this.e, this.w).then(cities => {
      this.cities = cities.geonames;
      if(this.cities.length > 0) {
        this.error = '';
        if(this.cityMarkers.length > 0) {
          this.removeMarkers(this.cityMarkers);
        }
        this.addMarkers(this.cityMarkers, this.cityMarker, this.cities, 'cities');
      } else {
        this.error = 'No cities in region';
      }
    })
    .catch(err => {
      console.log(err);
    });
  };

  this.cityMarker = () => {
    let address = this.address;
    this.geocoder.geocode({address}, (results, status) => {
      if (status == 'OK') {
        let bounds = results[0].geometry.bounds;
        this.n = bounds.f.b;
        this.s = bounds.f.f;
        this.e = bounds.b.f;
        this.w = bounds.b.b;


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
      } else {
        this.error = ('Geocode was not successful for the following reason: ' + status);
      }
    });       
  };
}

