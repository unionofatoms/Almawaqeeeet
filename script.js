async function fetchPrayers(city) {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=&method=0`);
        const data = await response.json();
        
        if(data.code === 200) {
            const t = data.data.timings;
            
            // --- حساب وقت الإمساك (الفجر ناقص 10 دقائق) ---
            let fajrTime = t.Fajr; // صيغة "05:10"
            let [hours, minutes] = fajrTime.split(':').map(Number);
            let date = new Date();
            date.setHours(hours, minutes - 10, 0); // طرح 10 دقائق
            
            let imsakHours = String(date.getHours()).padStart(2, '0');
            let imsakMinutes = String(date.getMinutes()).padStart(2, '0');
            let calculatedImsak = `${imsakHours}:${imsakMinutes}`;

            // تحديث الجدول
            document.getElementById('Imsak').innerText = calculatedImsak;
            document.getElementById('Fajr').innerText = t.Fajr;
            document.getElementById('Sunrise').innerText = t.Sunrise;
            document.getElementById('Dhuhr').innerText = t.Dhuhr;
            document.getElementById('Sunset').innerText = t.Sunset;
            document.getElementById('Maghrib').innerText = t.Maghrib;
            document.getElementById('Midnight').innerText = t.Midnight;
            
            document.getElementById('city-name').innerText = city;
        }
    } catch (error) { console.error("API Error"); }
}

