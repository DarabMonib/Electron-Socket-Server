const record = document.querySelector('.record-button')
const timer = document.querySelector('.timer');
const videoFrame = document.querySelector('video')
videoFrame.style.border = `1px white solid`;
window.electroApi.sendRecord(record)
let intervalId;

const save = document.querySelector('.save-button');
save.style.display = 'none';
window.electroApi.sendStop(save)

record.addEventListener('click', () => {
    timer.style.display = 'block';
    videoFrame.style.border = `5px tomato solid`;
    let ticks = 0;
    console.log('RECORDING!!!!')
    record.style.display = 'none';
    save.style.display = 'block';

    intervalId = setInterval(() => {
        ticks++;
        if(ticks > 9)
            timer.innerHTML = `0:${ticks}`
        else
            timer.innerHTML = `0:0${ticks}`
    
    }, 1000)
})

save.addEventListener('click', () => {
    clearInterval(intervalId)
    timer.style.display = 'none';
    videoFrame.style.border = `1px white solid`;
    timer.innerHTML = '0:00';

    console.log('SAVING!!!!')
    save.style.display = 'none';
    record.style.display = 'block';
})