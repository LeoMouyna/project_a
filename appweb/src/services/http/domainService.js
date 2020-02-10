import { HTTP } from "./httpService";

export default class DomainRequest {
  fetch(filters = {}) {
    return HTTP.get("domains", filters);
  }
  get(domain) {
    return HTTP.get(`domains/${domain.id}`);
  }
  post(domain) {
    console.log(domain);
    return HTTP.post("domains", domain);
  }
  put(domain) {
    return HTTP.put(`domains/${domain.id}`, domain);
  }
}
