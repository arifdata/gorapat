import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import './index.css'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar')

  const calendar = new Calendar(calendarEl, {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    navLinks: true, // can click day/week names to navigate views
    editable: false,
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      {
        title: 'All Day Event',
        start: '2023-09-01',
      },
      {
        title: 'Long Event',
        start: '2023-09-07',
        end: '2023-09-10',
        color: '#ff0000',
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: '2023-09-09T16:00:00',
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: '2023-09-16T16:00:00',
      },
      {
        title: 'Conference',
        start: '2023-09-11',
        end: '2023-09-13',
      },
      {
        title: 'Meeting',
        start: '2023-09-12T10:30:00',
        end: '2023-09-12T12:30:00',
      },
      {
        title: 'Lunch',
        start: '2023-09-12T12:00:00',
      },
      {
        title: 'Meeting',
        start: '2023-09-12T14:30:00',
      },
      {
        title: 'Happy Hour',
        start: '2023-09-12T17:30:00',
      },
      {
        title: 'Dinner',
        start: '2023-09-12T20:00:00',
      },
      {
        title: 'Birthday Party',
        start: '2023-09-13T07:00:00',
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2023-09-28',
      },
    ],
  })

  calendar.render()
})