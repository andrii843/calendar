'use strict';

class Calendar {
    constructor(wrapperId, date) {

        this.wrapperId = wrapperId;
        this.date = date;
        this.selectedDays = [];
        this.weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        this.draw();
        this.addEvents();
    }

    addEvents () {
        const items = document.querySelectorAll('.active');
        Array.from(items).forEach(item => {
            item.addEventListener('click', function () {
                const selected = document.querySelector('.selected');
                if (selected !== null)
                    selected.classList.remove('selected');
                this.classList.add('selected');
            })
        });

        let _date = this.date,
            _wrapperId = this.wrapperId;

        document.querySelector('.prev').addEventListener('click', function () {
            const selected = document.querySelector('.selected');
            new Calendar(_wrapperId, new Date(_date.getFullYear(), _date.getMonth() - 1, 1))
        });

        document.querySelector('.next').addEventListener('click', function () {
            new Calendar(_wrapperId, new Date(_date.getFullYear(), _date.getMonth() + 1, 1))
        });
    }

    draw () {
        const header = getHeader(this.date);
        const weekdays = getDiv('weekdays', null);
        this.weekdays.map(day => {
            const div = getDiv('calendar-item', day);
            div.classList.add('weekday');
            weekdays.appendChild(div);
        });
        const days = getDays(this.date);
        const container = getDiv('calendar-container', null);
        container.appendChild(weekdays);
        container.appendChild(days);

        const wrapper = getDiv('calendar-wrapper', null);
        wrapper.appendChild(header);
        wrapper.appendChild(container);

        const mainContainer = document.getElementById(this.wrapperId);
        mainContainer.innerHTML = null;
        mainContainer.appendChild(wrapper);

        function getHeader(date) {
            const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const header = getDiv('calendar-header', '');
            header.appendChild(getDiv('prev', '&#10094;'));
            header.appendChild(getDiv('header-date', months[date.getMonth()] + '&nbsp;' + date.getFullYear()));
            header.appendChild(getDiv('next', '&#10095;'));

            return header
        }

        function getDays(date) {
            const year = date.getFullYear(),
                month = date.getMonth(),
                firstDay = new Date(year, month, 1),
                lastDay = new Date(year, month + 1, 0),
                daysBefore = firstDay.getDay(),
                daysAfter = 6 - lastDay.getDay(),
                startDate = new Date(year, month, -daysBefore + 1),
                endDate = new Date(year, month, lastDay.getDate() + daysAfter);

            let dt = startDate,
                wrapper = getDiv('days', null),
                diff = endDate - dt;
            while (diff >= 0) {
                const dayDiv = getDiv('calendar-item', dt.getDate());
                dayDiv.classList.add(dt.getMonth() !== month ? 'disabled' : 'active');
                if (dt.getDay() === 0)
                    dayDiv.classList.add('holiday');

                const now = new Date;
                if (dt.getMonth()=== now.getMonth() && dt.getDate() === now.getDate())
                    dayDiv.classList.add('today');

                wrapper.appendChild(dayDiv);

                dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1);
                diff = endDate - dt;
            }

            return wrapper;
        }

        function getDiv(className, content) {
            let div = document.createElement('div');
            div.classList.add(className);
            div.innerHTML = content;

            return div;
        }
    }
}