const { RESTDataSource } = require('apollo-datasource-rest');

class DlpAPI extends RESTDataSource {
  constructor() {
    super();
    this.query = '1=1';
    this.baseURL = 'https://services7.arcgis.com/um8CA8KcKChzWgPS/arcgis/rest/services/DLP_Actual_List_of_Installations/FeatureServer/0/query?';
  }

  willSendRequest(request) {
    request.params.set('where', this.query);
    request.params.set('outFields', '*');
    request.params.set('f', 'pjson');
  }

  async getAllSchools() {
    const response = await this.get('');
    const { features } = JSON.parse(response);

    return Array.isArray(features) ? features.map(attribute => this.attributeReducer(attribute)) : [];
  }

  async getSchoolByName(school) {
    this.query = `SCHOOL like '${school}'`;
    const response = await this.get('');
    const { features } = JSON.parse(response);

    return this.attributeReducer(features[0]);
  }

  async getAllSchoolsByCounty(county) {
    this.query = `COUNTY like '${county}'`;
    const response = await this.get('');
    const { features } = JSON.parse(response);

    return Array.isArray(features) ? features.map(attribute => this.attributeReducer(attribute)) : [];
  }

  attributeReducer(attribute) {
    const { attributes } = attribute;
    return {
      id: attributes.SCHOOL_ID || 0,
      name: attributes.SCHOOL,
      cursor: `${attributes.SCHOOL_ID}`,
      zone: attributes.ZONE,
      ldds: attributes.LDDs,
      fid: attributes.FID,
      county: {
        id: 0,
        name: attributes.COUNTY,
        subCounty: {
          id: 0,
          name: attributes.SUB_COUNTY
        }
      }
    }
  }

}

module.exports = DlpAPI;
