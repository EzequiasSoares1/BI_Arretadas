import axiosInstance from './index';

const cityName = localStorage.getItem('city');

export const getAllAdminUsers = () => {
  return axiosInstance.get('/reports/usersAdm');
}

export const getAllUsersByCity = () => {
  return axiosInstance.get('/reports/users/city', {
    params: {
      city: cityName
    }
  });
}

export const getUsersByPeriod = (startDate, endDate) => {
  return axiosInstance.get('/reports/users/period', {
    params: {
      startDate,
      endDate,
      city: cityName
    }
  });
}

export const getAllUsers = () => {
  return axiosInstance.get('/reports/users');
}

export const getAllComplaints = () => {
  return axiosInstance.get('/reports/complaints');
}

export const getComplaintsByCity = () => {
  return axiosInstance.get('/reports/complaints/city', {
    params: {
      city: cityName
    }
  });
}

export const getComplaintsByPeriod = (startDate, endDate) => {
  return axiosInstance.get('/reports/complaints/period', {
    params: {
      startDate,
      endDate,
      city: cityName
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
          endDate,
          city: cityName
        }
    });
}
  
export const getAlertsByCity = () => {
    return axiosInstance.get('/reports/alerts/city', {
        params: {
            city: cityName
        }
    });
}
