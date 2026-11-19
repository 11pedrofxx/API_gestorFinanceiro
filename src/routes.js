import User from './Controller/userController.js';

export default function addRoutes(api) {

    api.use(User)

}