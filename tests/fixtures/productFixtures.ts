export const invalidGUID = 'invalidguidstring-738d-489b-bc2b-a3b0d99bb517';
export const invalidName = 'NA';
export const nonExistentGUID = '9659a37b-738d-489b-bc2b-a3b0d99bb517';

export const productOneId = '8659a37b-738d-489b-bc2b-a3b0d99bb517';
export const productOnePostBody = {
  name: 'Amazing Product Name One',
  description: 'Amazing Product Description One',
  price: 10.30,
  deliveryPrice: 20.30,
};
export const productOne = {
  id: productOneId,
  ...productOnePostBody,
};

export const productTwoId = '66f126af-bc02-4251-adfd-826e3ca759f9';
export const productTwoPostBody = {
  name: 'Amazing Product Name Two',
  description: 'Amazing Product Description Two',
  price: 12.30,
  deliveryPrice: 22.30,
};
export const productTwo = {
  id: productTwoId,
  ...productTwoPostBody,
};

export const productOneOptionOneId = '1ed606ed-6bfc-4198-92a5-a9577028da5a';
export const productOneOptionOnePostBody = {
  name: 'Amazing Product One Option Name One',
  description: 'Amazing Product One Option Description One',
};
export const productOneOptionOne = {
  id: productOneOptionOneId,
  productId: productOneId,
  ...productOneOptionOnePostBody
};

export const productOneOptionTwoId = '83216af3-8ef0-4da8-a3b5-be2978f6c961';
export const productOneOptionTwoPostBody = {
  name: 'Amazing Product One Option Name Two',
  description: 'Amazing Product One Option Description Two',
}
export const productOneOptionTwo = {
  id: productOneOptionTwoId,
  productId: productOneId,
  ...productOneOptionTwoPostBody,
};

export const productTwoOptionOneId = '29b27d19-e4bb-4c4e-8ef1-d163870815a2';
export const productTwoOptionOnePostBody = {
  name: 'Amazing Product Two Option Name One',
  description: 'Amazing Product Two Option Description One',
}
export const productTwoOptionOne = {
  id: productTwoOptionOneId,
  productId: productTwoId,
  ...productTwoOptionOnePostBody,
};
