const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const successResponse = {
    message: 'This is a successful response',
    id: 'success',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${successResponse.message}</message>`;
    responseXML = `${responseXML}<id>${successResponse.id}</id>`;
    responseXML = `${responseXML} </response>`;
    console.dir(responseXML);
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const successString = JSON.stringify(successResponse);
  console.dir(successString);
  return respond(request, response, 200, successString, 'application/json');
};


const badRequest = (request, response, acceptedTypes, params) => {
  const badRequestResponse = {
    message: 'This request has the required parameters',
  };
  // if request does not have the valid == true query parameter
  if (!params.valid || params.valid !== 'true') {
    badRequestResponse.message = 'Missing valid query parameter valid set to true';
    badRequestResponse.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML}<message>${badRequestResponse.message}</message>`;
      responseXML = `${responseXML}<id>${badRequestResponse.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    const badRequestString = JSON.stringify(badRequestResponse);
    return respond(request, response, 400, badRequestString, 'application/json');
  }
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${badRequestResponse.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const badRequestString = JSON.stringify(badRequestResponse);
  return respond(request, response, 200, badRequestString, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const unauthorizedResponse = {
    message: 'You have successfully viewed the content',

  };
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    unauthorizedResponse.message = 'Missing loggedIn query parameter set to yes';
    unauthorizedResponse.id = 'unauthorized';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML}<message>${unauthorizedResponse.message}</message>`;
      responseXML = `${responseXML}<id>${unauthorizedResponse.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 401, responseXML, 'text/xml');
    }
    const unauthorizedString = JSON.stringify(unauthorizedResponse);
    return respond(request, response, 401, unauthorizedString, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${unauthorizedResponse.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const unauthorizedString = JSON.stringify(unauthorizedResponse);
  return respond(request, response, 200, unauthorizedString, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const forbiddenResponse = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${forbiddenResponse.message}</message>`;
    responseXML = `${responseXML}<id>${forbiddenResponse.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const forbiddenString = JSON.stringify(forbiddenResponse);
  return respond(request, response, 403, forbiddenString, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  const internalResponse = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${internalResponse.message}</message>`;
    responseXML = `${responseXML}<id>${internalResponse.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const internalString = JSON.stringify(internalResponse);
  return respond(request, response, 500, internalString, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const notImplementedResponse = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${notImplementedResponse.message}</message>`;
    responseXML = `${responseXML}<id>${notImplementedResponse.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 501, responseXML, 'text/xml');
  }
  const notImplementedString = JSON.stringify(notImplementedResponse);
  return respond(request, response, 501, notImplementedString, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const notFoundResponse = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${notFoundResponse.message}</message>`;
    responseXML = `${responseXML}<id>${notFoundResponse.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const notFoundString = JSON.stringify(notFoundResponse);
  return respond(request, response, 404, notFoundString, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
