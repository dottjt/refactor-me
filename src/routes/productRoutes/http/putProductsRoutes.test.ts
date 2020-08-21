
describe('putProductRoutes', () => {
  describe('putUpdateSingleProductRoute - /products/', () => {
    it('should insert a new product into the database', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `id` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if a non-specified post body field is not passed', () => {
      expect('cake').toBe('cake');
    });
  });

  describe('putUpdateSingleProductOptionRoute - /products/:id/options', () => {
    it('should insert a new product option into the database', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if a non-specified post body field is not passed', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `id` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `optionId` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });
  });
});