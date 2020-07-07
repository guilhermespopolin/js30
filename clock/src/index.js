const secondHandElement = document.querySelector(".clock__hand--second");
const minuteHandElement = document.querySelector(".clock__hand--minute");
const hourHandElement = document.querySelector(".clock__hand--hour");

function setTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondInDegrees = (360 / 60) * seconds - 90;
  const minuteInDegrees = (360 / 60) * minutes - 90;
  const hourInDegrees = (360 / 12) * hours - 90;

  secondHandElement.style.transform = `rotate(${secondInDegrees}deg)`;
  minuteHandElement.style.transform = `rotate(${minuteInDegrees}deg)`;
  hourHandElement.style.transform = `rotate(${hourInDegrees}deg)`;
}

setInterval(() => setTime(), 1000);
