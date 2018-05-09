const token = 'xyz';

function getPatient(id, cb) {
  return fetch(`https://api.athenahealth.com/preview1/1959540/patients/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(function(error) {
      cb(-1);
    });
}

function getPatientMeds(id, cb) {
  return fetch(`https://api.athenahealth.com/preview1/1959540/chart/${id}/medications?departmentid=1`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(function(error) {
      cb(-1);
    });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.error(error);
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const PatientClient = { getPatient, getPatientMeds };
export default PatientClient;
