export const channelBatcher = async (ids, models, user) => {
  const results = await models.sequelize.query(
    `
    select c.id, c.name, c.public, c.team_id, c.dm
    from channels as c
    left join pcmembers as pc
    on c.id = pc.channel_id
    where c.team_id in (:teamIds) and (c.public = true or pc.user_id = :userId) group by c.id`,
    {
      replacements: { teamIds: ids, userId: user.id },
      model: models.Channel,
      raw: true
    }
  );

  const data = {};

  results.forEach(result => {
    if (data[result.team_id]) {
      data[result.team_id].push(result);
    } else {
      data[result.team_id] = [result];
    }
  });

  return ids.map(id => data[id]);
};

export const userBatcher = async (ids, models) => {
  const results = await models.sequelize.query(
    `
    select *
    from users as u
    where u.id in (:userIds)
    `,
    {
      replacements: { userIds: ids },
      model: models.User,
      raw: true
    }
  );

  const data = {};

  // group by user id
  results.forEach(r => {
    data[r.id] = r;
  });

  return ids.map(id => data[id]);
};
