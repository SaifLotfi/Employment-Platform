export const getFilterObject = (reqQueryObject: any) => {
  const query = (reqQueryObject.query as string) || '';
  const city = reqQueryObject.city as string;
  const expLevel = reqQueryObject.expLevel as string;
  //const programmingLanguages = (reqQueryObject.programmingLanguages as string)
  //  ?.split(',')
  //  .map(lang => lang.trim());

  const filters: {[key: string]: any}= {
    AND: [
      {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { title: { contains: query, mode: 'insensitive' } },
        ],
      },
    ],
  };

  if (city) filters.AND.push({ city: { contains: city, mode: 'insensitive' } });
  if (expLevel) filters.AND.push({ expLevel: { equals: expLevel } });
  //if (programmingLanguages?.length)
  //  filters.AND.push({ programmingLanguages: { hasSome: programmingLanguages } });
  //

  return filters;
};
