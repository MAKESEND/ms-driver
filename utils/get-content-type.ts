import { ContentType } from '~/constants/content-types';

export const getContentType = (text: string): ContentType => {
  let type = ContentType.TEXT;
  const orderRegex = new RegExp(/ms\d{13}/, 'i');
  const parcelRegex = new RegExp(/ex\d{13}/, 'i');
  const urlRegex = new RegExp(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  );

  if (orderRegex.test(text)) {
    type = ContentType.ORDER;
  } else if (parcelRegex.test(text)) {
    type = ContentType.PARCEL;
  } else if (urlRegex.test(text)) {
    type = ContentType.URL;
  }

  return ContentType[type];
};
