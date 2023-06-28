const orderIdReg = new RegExp('ms\\d{13}', 'i');
const parcelIdReg = new RegExp('ex\\d{13}', 'i');

export const parseContent = {
  isOrderId: (orderId: string) => orderIdReg.test(orderId),
  extractOrderId: (orderId: string) => orderIdReg.exec(orderId),
  isParcelId: (parcelId: string) => parcelIdReg.test(parcelId),
  extractParcelId: (parcelId: string) => parcelIdReg.exec(parcelId),
};
