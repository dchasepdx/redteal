geonamesService.$inject = ['$http', 'apiUrl'];

export default function geonamesService($http, apiUrl) {
  return {
    getInfo(type, n, s, e, w) {
      return $http.get(`${apiUrl}/${type}JSON?north=${n}&south=${s}&east=${e}&west=${w}&username=dchasepdx`)
        .then(res => {
          return res.data;
        });
    }
  };
}