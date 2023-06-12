const serverResponse = (res, status = 200, message = '') => res.status(status).json(message).end();

export default serverResponse;