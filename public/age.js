function updateAge() {
  // Birthday: January 17, 2005 at 11:12 German time
  const birthYear = 2005;
  const birthMonth = 0; // January
  const birthDay = 17;
  const birthHour = 11;
  const birthMinute = 12;

  // Get current time in German timezone with millisecond precision
  const now = new Date();
  const germanTimeStr = now.toLocaleString("en-US", {
    timeZone: "Europe/Berlin",
  });
  const germanTime = new Date(germanTimeStr);
  germanTime.setMilliseconds(now.getMilliseconds());

  const currentYear = germanTime.getFullYear();
  const birthdayThisYear = new Date(
    currentYear,
    birthMonth,
    birthDay,
    birthHour,
    birthMinute,
    0
  );

  let age;
  if (germanTime < birthdayThisYear) {
    // Before birthday this year
    const lastBirthday = new Date(
      currentYear - 1,
      birthMonth,
      birthDay,
      birthHour,
      birthMinute,
      0
    );
    const msInYear = birthdayThisYear - lastBirthday;
    const msSinceBirthday = germanTime - lastBirthday;
    age = currentYear - 1 - birthYear + msSinceBirthday / msInYear;
  } else {
    // On or after birthday this year
    const nextBirthday = new Date(
      currentYear + 1,
      birthMonth,
      birthDay,
      birthHour,
      birthMinute,
      0
    );
    const msInYear = nextBirthday - birthdayThisYear;
    const msSinceBirthday = germanTime - birthdayThisYear;
    age = currentYear - birthYear + msSinceBirthday / msInYear;
  }

  const ageElement = document.getElementById("age");
  if (ageElement) {
    ageElement.textContent = age.toFixed(11);
  }
  requestAnimationFrame(updateAge);
}
updateAge();
