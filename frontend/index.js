import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import multimonthPlugin from '@fullcalendar/multimonth'
import './index.css'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import translateID from '@fullcalendar/core/locales/id'

document.addEventListener('DOMContentLoaded', async function () {

  // ubah homeUrl menjadi empty string jika mau menjalankan 'go build .'
  const homeUrl = 'http://127.0.0.1:8090';
  const calendarEl = document.getElementById('calendar');
  let keteranganEl = document.getElementById('listKeterangan');

  // tarik data nama ruangan dan keterangan warna
  fetch(`${homeUrl}/api/collections/ruangan/records?page=1&perPage=500`)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    for (var i=0; i < data.items.length; i++){
      console.log(data.items[i]);
      keteranganEl.insertAdjacentHTML('afterbegin', `<li><div id="keterangan" style="background-color: ${data.items[i]['label_warna']};">${data.items[i]['nama']}</div></li>`);
    }
  })
  .catch((err) => {
    alert(err)
  })

  // FullCalendar setting
  const calendar = new Calendar(calendarEl, {
    //contentHeight: 700,
    aspectRatio: 1.8,
    timeZone: 'UTC',
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin, multimonthPlugin],
    locale: translateID,
    //displayEventEnd: true,
    buttonIcons: {
      prev: 'caret-left-fill',
      next: 'caret-right-fill',
      today: 'house-fill',
    },
    initialView: 'dayGridMonth',
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev next today',
      center: 'title',
      right: 'multiMonthYear,dayGridMonth,timeGridWeek,listWeek',
    },
    navLinks: true,
    editable: false,
    dayMaxEvents: true,
    
    // tarik data event dari pocketbase
    events: function (info, successCallback, failureCallback){
      const rentangAwal = info.start.toISOString().slice(0,10);
      const rentangAkhir = info.end.toISOString().slice(0,10);
      fetch(`${homeUrl}/api/collections/event/records?page=1&perPage=500&filter=start%20%3E%3D%20%22${rentangAwal}%22%20%26%26%20end%20%3C%3D%20%22${rentangAkhir}%22&expand=ruang`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let daftar_event = [];
        for (var i=0; i < data.items.length; i++){
          daftar_event.push({
            title: data.items[i]['title'],
            start: data.items[i]['start'],
            end: data.items[i]['end'],
            backgroundColor: data.items[i]['expand']['ruang']['label_warna'],
          });
        };
        successCallback(daftar_event);
      })
      .catch((err) => {
        failureCallback(err);
      });
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
    },
  });

  calendar.render();
})