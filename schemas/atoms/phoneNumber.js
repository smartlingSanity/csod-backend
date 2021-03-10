export default {
  name: 'phoneNumber',
  title: 'Phone Number',
  type: 'object',
  fields: [
    {
      title: 'Phone Number',
      name: 'phoneNumber',
      type: 'string',
      validation: Rule => Rule.custom((phoneNumber) => {
        const phoneRegex = /^\+?\d+$/g;
        if (typeof phoneNumber === 'string') {
          const phone = phoneNumber.replace(/[\s().-]/g, '');
          if (phone.match(phoneRegex)) {
            return true;
          }
          return 'Invalid Phone Number';
        }
        return 'Required';
      }),
    },
  ],
};
