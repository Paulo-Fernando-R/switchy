import { Router } from "express";
import NotificationsController from "../controllers/notificationsController";

const notificationsRoutes = Router();
const notificationsController = new NotificationsController();

notificationsRoutes.put('/Read', (req, res) => {
    // #swagger.tags = ['Notifications']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[401] = { description: 'Unauthorized.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }

    return notificationsController.putReader(req, res);
});

notificationsRoutes.get('/:page', (req, res) => {
    // #swagger.tags = ['Notifications']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[401] = { description: 'Unauthorized.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }

    return notificationsController.getLastEntriesByUser(req, res);
})

export default notificationsRoutes;