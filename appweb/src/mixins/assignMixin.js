import { dateMixin } from "./dateMixin";
export const assignMixin = {
  mixins: [dateMixin],
  methods: {
    assignedUsersId(instance) {
      const list = instance.requiredUsers.flatMap(required =>
        required.assigned.map(user => user.id)
      );
      return list;
    },
    userNeeded(instance, userTeamIds, userId) {
      if ("requiredUsers" in instance) {
        const test = instance.requiredUsers
          .map(required => {
            // Is my user needed but not assigned ?
            if ("id" in required) {
              return (
                required.id == userId &&
                !this.assignedUsersId(instance).includes(userId)
              );
            }
            // Is one of my user teams match with not fully assigned required team members
            else if ("number" in required) {
              return (
                required.assigned.length < required.number &&
                userTeamIds.includes(required.team.id)
              );
            } else return false;
          })
          .includes(true);
        return test;
      } else return false;
    },
    splitAvailabilities(availabilities, dateInterval) {
      let concernedAvailability = this.getAvailabilityFromInterval(
        availabilities,
        dateInterval
      );
      const availabilityIndex = availabilities.indexOf(concernedAvailability);
      const newAvailabilities = this.splitInterval(
        availabilities,
        dateInterval
      );
      if (availabilityIndex >= 0) {
        availabilities.splice(availabilityIndex, 1);
        availabilities.concat(newAvailabilities);
      }
      return availabilities;
    },
    getAvailabilityFromInterval(availabilities, dateInterval) {
      return availabilities
        .sort(this.compareDateInterval)
        .find(availability => this.isIncludedIn(dateInterval, availability));
    },
    assign(user, taskInstance, as) {
      const userToAssign = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        surname: user.surname,
        teams: user.teams
      };
      // Assign as team member
      if ("name" in as) {
        let required = taskInstance.requiredUsers.find(
          required => required.team.id == as.id
        );
        const requiredIndex = taskInstance.requiredUsers.indexOf(required);
        required.assigned.push(userToAssign);
        if (requiredIndex >= 0) {
          taskInstance.requiredUsers[requiredIndex] = required;
          user.availabilities = this.splitAvailabilities(
            user.availabilities,
            taskInstance
          );
        }
        return { user, taskInstance };
      } else return { user, taskInstance };
    }
  }
};
