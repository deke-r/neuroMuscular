const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Fetch all doctors
export const fetchDoctors = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/doctors`);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Failed to fetch doctors');
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error;
    }
};

// Fetch services for a specific doctor
export const fetchServicesByDoctor = async (doctorId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/services/doctor/${doctorId}`);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Failed to fetch services');
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

// Fetch available time slots
export const fetchAvailableSlots = async (doctorId, date) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/appointments/available-slots?doctorId=${doctorId}&date=${date}`
        );
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Failed to fetch available slots');
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching available slots:', error);
        throw error;
    }
};

// Book an appointment
export const bookAppointment = async (appointmentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Failed to book appointment');
        }

        return data.data;
    } catch (error) {
        console.error('Error booking appointment:', error);
        throw error;
    }
};
