import signup from './_Mutations/signup'
import login from './_Mutations/login'
import logout from './_Mutations/logout';
import createProject from './_Mutations/Create/createProject'
import createEvent from './_Mutations/Create/createEvent'
import createCreature from './_Mutations/Create/createCreature'
import deleteCurrentUser from './_Mutations/Delete/deleteCurrentUser'
import deleteEvent from './_Mutations/Delete/deleteEvent'
import deleteProject from './_Mutations/Delete/deleteProject'
import deleteCreature from './_Mutations/Delete/deleteCreature'
import updateProject from './_Mutations/Update/updateProject'
import updateCreature from './_Mutations/Update/updateCreature'
import updateEvent from './_Mutations/Update/updateEvent';
import updateCurrentUser from './_Mutations/Update/updateCurrentUser';

const Mutation = {
  signup,
  login,
  logout,
  createProject,
  createEvent,
  createCreature,
  deleteCurrentUser,
  deleteEvent,
  deleteProject,
  deleteCreature,
  updateProject,
  updateCreature,
  updateEvent,
  updateCurrentUser
}

export default Mutation
