export const getEmployeeFilterObject = (reqQueryObject: any) => {
  const city = reqQueryObject.city as string;
  const expLevel = reqQueryObject.expLevel as string;

  const filters: { [key: string]: any } = {
    AND: [],
  };

  if (city) filters.AND.push({ city: { contains: city, mode: 'insensitive' } });
  if (expLevel) filters.AND.push({ expLevel: { equals: expLevel } });

  return filters;
};

export const getJobFilterObject = (reqQueryObject: any) => {
  const query = (reqQueryObject.query as string) || '';
  const expLevel = reqQueryObject.expLevel as string;

  const filters: { [key: string]: any } = {
    AND: [
      {
        OR: [
          { description: { contains: query, mode: 'insensitive' } },
          { title: { contains: query, mode: 'insensitive' } },
        ],
      },
    ],
  };

  if (expLevel) filters.AND.push({ expLevel: { equals: expLevel } });

  return filters;
};
