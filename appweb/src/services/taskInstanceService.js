export default {
  getMoreSuitableTeamFieldItem(task, fieldName, user, callFunction) {
    return callFunction(
      task.requiredUsers
        .filter(req => "team" in req)
        .filter(req => user.teams.map(team => team.id).includes(req.team.id))
        .map(req => req.team[fieldName])
    );
  }
};
