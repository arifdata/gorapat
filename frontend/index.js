import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import './index.css'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import translateID from '@fullcalendar/core/locales/id';
import PocketBase from 'pocketbase';

/*const pb = new PocketBase('http://127.0.0.1:8090');
const resultList = await pb.collection('event').getList(1, 50, {
  filter: 'created >= "2023-01-01 00:00:00"',
});
console.log(resultList.items[0]['created']);*/

document.addEventListener('DOMContentLoaded', async function () {
  var list_events = [];
  const calendarEl = document.getElementById('calendar');
  const pb = new PocketBase('http://127.0.0.1:8090');
  const resultList = await pb.collection('event').getList(1, 50, {
  filter: 'start >= "2023-09-01 00:00:00"',
  });
  const ev = resultList.items;
  console.log(ev);

  for (var i = 0; i < ev.length; i++) {
    list_events.push({
      title: ev[i]['title'],
      start: ev[i]['start'],
      end: ev[i]['end'],
    });
  };

  const calendar = new Calendar(calendarEl, {
    timeZone: 'UTC',
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
    locale: translateID,
    displayEventEnd: true,
    buttonIcons: {
      prev: 'caret-left-fill',
      next: 'caret-right-fill',
      today: 'house-fill',
    },
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    navLinks: true, // can click day/week names to navigate views
    editable: false,
    dayMaxEvents: true, // allow "more" link when too many events
    /*events: [
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
    ],*/
    events: list_events,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
    },
  });

  calendar.render();
})