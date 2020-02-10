import { HTTP } from "./httpService";

export default class InstitutionRequest {
  fetch(filters = {}) {
    return HTTP.get("institutions", filters);
  }
  get(institution) {
    return HTTP.get(`institutions/${institution.id}`);
  }
  post(institution) {
    console.log(institution);
    return HTTP.post("institutions", institution);
  }
  put(institution) {
    return HTTP.put(`institutions/${institution.id}`, institution);
  }
}
