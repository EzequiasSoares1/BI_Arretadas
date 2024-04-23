import axiosInstance from './index';

const cityName = localStorage.getItem('city');

export const getAllAdminUsers = () => {
  return axiosInstance.get('/reports/usersAdm');
}

export const getAllUsersByCity = () => {
  return axiosInstance.get(`/reports/users/${cityName}`)
}

export const getAllUsers = () => {
  return axiosInstance.get('/reports/users');
}

export const getAllComplaints = () => {
  return axiosInstance.get('/reports/complaints');
}

export const getComplaintsByCity = () => {
  return axiosInstance.get(`/reports/complaints/city/${cityName}`);
}

export const getComplaintsByTypeAndCity = (type) => {
  return axiosInstance.get(`/reports/complaints/${type}/city/${cityName}`);
}

export const getComplaintsByLocalization = (latitude, longitude) => {
  return axiosInstance.get('/reports/complaints/localization', {
    params: {
      latitude,
      longitude
    }
  });
}

export const getComplaintsByPeriod = (startDate, endDate) => {
  return axiosInstance.get('/reports/complaints/period', {
    params: {
      startDate,
      endDate
    }
  });
}

export const getComplaintsByPeriodAndType = (startDate, endDate, type) => {
  return axiosInstance.get('/reports/complaints/periodAndType', {
    params: {
      startDate,
      endDate,
      type
    }
  });
}

export const getAllAlerts = () => {
    return axiosInstance.get('/reports/alerts');
  }
  
export const getAlertsByPeriod = (startDate, endDate) => {
    return axiosInstance.get('/reports/alerts/period', {
        params: {
        startDate,
        endDate
        }
    });
}
  
export const getAlertsByCity = () => {
    return axiosInstance.get(`/reports/alerts/city/${cityName}`);
}