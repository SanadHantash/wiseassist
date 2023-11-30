// googleCalendarMiddleware.js
const { google } = require('googleapis');
const Dashboard = require('../Models/dashboardModel');
const serviceAccount = require('../calendar.json');

const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: 'v3' });

const createGoogleCalendarEvent = async (event, auth) => {
    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: process.env.CALENDAR_ID,
            resource: event,
        });

        if (response.status === 200 && response.statusText === 'OK') {
            return response.data.id;
        } else {
            return null;
        }
    } catch (error) {
        console.log(`Error at createGoogleCalendarEvent --> ${error}`);
        throw new Error('Failed to create Google Calendar event');
    }
};

const dateTimeForCalendar = (start_time, end_time) => {
    const now = new Date();
    
    let start, end;

    if (start_time instanceof Date && end_time instanceof Date) {
        start = start_time;
        end = end_time;
    } else if (typeof start_time === 'number' && typeof end_time === 'number') {
        start = new Date(start_time * 1000);
        end = new Date(end_time * 1000);
    } else {
        throw new Error('Invalid start_time or end_time format');
    }

    return {
        start: start,
        end: end,
    };
};


const createAuth = () => {
    return new google.auth.JWT({
        email: serviceAccount.client_email,
        key: serviceAccount.private_key,
        scopes: SCOPES,
    });
};

const googleCalendarMiddleware = async (req, res, next) => {
    try {
        const auth = createAuth();

        const { title, detail, description, trainer, start_time, end_time, category_id, imageUrl, audince_id, site } = req.body;

        if (start_time === undefined || end_time === undefined) {
            return res.status(400).json({ success: false, error: 'start_time and end_time are required' });
        }

        const { start, end } = dateTimeForCalendar(start_time, end_time);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ success: false, error: 'Invalid start_time or end_time format' });
        }

        const event = {
            summary: title || 'Default Summary',
            description: description || 'Default Description',
            start: {
                dateTime: start.toISOString(),
                timeZone: 'Asia/Amman',
            },
            end: {
                dateTime: end.toISOString(),
                timeZone: 'Asia/Amman',
            },
        };

        const eventId = await createGoogleCalendarEvent(event, auth);

        if (eventId) {
            await Dashboard.createcourse(
                title,
                detail,
                description,
                trainer,
                start,
                end,
                category_id,
                imageUrl,
                audince_id,
                site
            );

            req.googleCalendarEventId = eventId;
            next();
        } else {
            res.status(500).json({ success: false, error: 'Error creating Google Calendar event' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message || 'Error in Google Calendar integration' });
    }
};
module.exports = {
    googleCalendarMiddleware,
};
