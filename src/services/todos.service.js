import { httpService } from "./http.servise";

const todoEndpoint = "todos/";

export const todoService = {
   fetch: async () => {
      const { data } = await httpService.get(todoEndpoint, {
         params: {
            _page: 1,
            _limit: 10
         }
      });
      return data;
   }
}

