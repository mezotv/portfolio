function updateAge() {
  const birthday = new Date("2005-01-17T11:12:00+01:00").getTime();
  const now = performance.now() + performance.timeOrigin;
  const ageInMs = now - birthday;
  const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
  const ageElement = document.getElementById("age");
  if (ageElement) {
    ageElement.textContent = ageInYears.toFixed(11);
  }
  requestAnimationFrame(updateAge);
}
updateAge();
