export default (router) => {
  router.beforeEach(async (to, from) => {
		// Находим мидлвары в свойстве meta.middlewares маршрута на который происходит доступ
    const middlewares = to.meta.middlewares
	  // Если у маршрута нет мидлваров, то переходим на страницу
    if (!middlewares) {
      return true
    }
		// Делаем перебор мидлваров
    for (const middleware of middlewares) {
      const result = await middleware({ to, from })
	    // Если мидлвар возвращает объект или строку маршрута, то мы прерываем цепочку и возвращаем результат
      if (
        typeof result === 'object' ||
        typeof result === 'string' ||
        result === false
      ) {
        return result
      }
    }
    return true
  })
}
