geonamesService.$inject = ['$http', 'apiUrl'];

export default function geonamesService($http, apiUrl) {
  return {
    getInfo(type, n, s, e, w) {
      console.log('what endpoint did i call', `${apiUrl}/${type}JSON?north=${n}&south=${s}&east=${e}&west=${w}&username=dchasepdx`);
      return $http.get(`${apiUrl}/${type}JSON?north=${n}&south=${s}&east=${e}&west=${w}&username=dchasepdx`)
        .then(res => {
          return res.data;
        });
    }
  };
}