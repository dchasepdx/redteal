geonamesService.$inject = ['$http', 'apiUrl'];

export default function geonamesService($http, apiUrl) {
  return {
    getCity() {
      return $http.get(`${apiUrl}/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=dchasepdx`)
        .then(res => res.data);
    }
  };
}