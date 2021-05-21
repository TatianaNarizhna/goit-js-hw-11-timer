
const refs = {
    frontSide: document.querySelector('#timer-1'),
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
}

const TIME_INTERVAL = 1000;

class CountdownTimer {

    constructor({selector, targetDate} = {}) {
        this.timeId = null;
        this.selector = selector;
        this.targetDate = targetDate;
    }

    createTime() {
        const currentTime = Date.now();
        const difference = this.targetDate - currentTime;
        const timeForCount = this.receiveTime(difference);
        // console.log(`${days}:${hours}:${mins}:${secs}`);
        this.clockFace(timeForCount);

        if(difference < 0) {
            clearInterval(this.timeId);
            refs.frontSide.textContent = "Поздравляем с началом учебного года!"
            return;
        };
    };

    startCounting() {
        this.createTime();

        this.timeId = setInterval(() => {
        this.createTime()
      
       }, TIME_INTERVAL) 
    };

    pad(value) {
        return String(value).padStart(2, '0');
    }

    clockFace({days, hours, mins, secs}) {
        // refs.frontSide.textContent = `${days}:${hours}:${mins}:${secs}`;
        refs.days.textContent = `${days}`;
        refs.hours.textContent = `${hours}`;
        refs.mins.textContent = `${mins}`;
        refs.secs.textContent = `${secs}`;
    }

    receiveTime(time) {   
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));    

        return {days, hours, mins, secs};
        }

};

const forTimer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Sep 1, 2021'), 
});

forTimer.startCounting();
