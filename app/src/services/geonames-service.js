geonamesService.$inject = ['$http', 'apiUrl'];

export default function geonamesService($http, apiUrl) {
  return {
    getEarthquakes(n, s, e, w) {
      return $http.get(`${apiUrl}/earthquakesJSON?north=${n}&south=${s}&east=${e}&west=${w}&username=dchasepdx`)
        .then(res => {
          return res.data;
        });
    }
  };
}