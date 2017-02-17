describe('geonames service', () => {
  const {assert} = chai;
  beforeEach(
    angular.mock.module('services', {apiUrl: 'http://api.geonames.org'})
  );

  let $httpBackend = null, geonamesService = null;

  beforeEach(angular.mock.inject((_geonamesService_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    geonamesService = _geonamesService_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('gets data from geonames', done => {
    const data = ['city', 'city2', 'city3'];
    $httpBackend
      .expectGET('http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=dchasepdx')
      .respond(data);

    geonamesService.getCity()
      .then(cityData => {
        assert.deepEqual(cityData, data);
        done();
      })
      .catch(done);

    $httpBackend.flush();

  });
});