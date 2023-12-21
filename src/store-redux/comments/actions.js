export default {
  /**
* Загрузка товара
* @param id
* @return {Function}
*/
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Товар загружен успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error', payload: { e } });
      }
    };
  },
  addComment: ({ text, parent, id }) => {
    return async (dispatch, getState, services) => {
      const token = localStorage.getItem("token")
      dispatch({ type: 'comments/add-start' });

      try {
        const body = {
          text,
          parent,
        }

        const res = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted&search[parent]=${id}`,
          method: "POST",
          headers: {
            'X-Token': token,
          },
          body: JSON.stringify(body)
        });

        // Обновление по добавлению коммента
        dispatch({type: 'comments/add', payload: { item: res.data.result }})
        dispatch({type: 'comments/add-end'});
      }
      catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    }
  }
};