import { HTTPClient } from "./config";
import { API_URL } from "constants/api";

export const fetchGallery = (query, page) => {
    let baseOptions = {
        key: '34579319-e65916c8fd3357218f04822ae',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 12,
        q: query.trim(),
  };

    return  HTTPClient
      .get(
        API_URL, {params: baseOptions}
      )
      .then(({ data }) => ({
        items: data.hits,
        total: data.totalHits,
        }));

};