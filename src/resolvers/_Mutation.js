import signup from './_Mutations/signup';
import login from './_Mutations/login';
import createProject from './_Mutations/Create/createProject';
import createEvent from './_Mutations/Create/createEvent';
import createCreature from './_Mutations/Create/createCreature';
import deleteCurrentUser from './_Mutations/Delete/deleteCurrentUser';
import deleteEvent from './_Mutations/Delete/deleteEvent';
import deleteProject from './_Mutations/Delete/deleteProject';
import deleteCreature from './_Mutations/Delete/deleteCreature';
import updateProject from './_Mutations/Update/updateProject';
import updateCreature from './_Mutations/Update/updateCreature'

const Mutation = {
  signup,
  login,
  createProject,
  createEvent,
  createCreature,
  deleteCurrentUser,
  deleteEvent,
  deleteProject,
  deleteCreature,
  updateProject,
  updateCreature
}

//NOTE: mit request.get('Authorization') bekommt man dann den mitgelieferten Auth token! :)

export default Mutation
