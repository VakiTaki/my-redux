import { httpService } from "./http.servise";

const todoEndpoint = "todos/";

export const todoService = {
   fetch: async () => {
      const { data } = await httpService.get(todoEndpoint, {
         params: {
            _page: 1,
            _limit: 5
         }
      });
      return data;
   },
   create: async (content) => {
      const { data } = await httpService.post(todoEndpoint, content);
      return data;
   }
}

