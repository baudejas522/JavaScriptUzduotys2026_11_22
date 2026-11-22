// -----1------

const timeUntil = (eventDate, now) =>
    {
        const dateOfEvent = new Date(eventDate).getTime();
        const dateNow = new Date(now).getTime();

        //Galejo but global nes kitur irgi naudojau

        const oneSecond = (1000); // sekunde to milisekunde 
        const oneMinute = (1000 * 60); // minute to milisekunde
        const oneHour = (1000 * 60 * 60); // valanda to minisekunde
        const oneDay = (1000 * 60 * 60 * 24); // diena to milisekunde
        
        let timeLeft = dateOfEvent - dateNow; // eventDate - now
        let days = Math.floor(timeLeft / oneDay); // diena be liekanos
        let hours = Math.floor((timeLeft % oneDay) / oneHour); // valandos be liekanos
        let minutes = Math.floor((timeLeft % oneHour) / oneMinute); // minutes be liekanos 


        if(dateOfEvent < dateNow)
            {
                return "Renginys jau ivyko";
            }
        else
            {
                return (`Liko ${days} d. ${hours} val. ${minutes} min.`);
            }
    }
    console.log(timeUntil("2026-12-20T18:30:00",  new Date("2026-12-18T14:15:00")));


const checkPassword = (password) =>
    {
        let sum = 0;
        let points = "";

        //Nezinau ar buvo galima bet is interneto radau situs
        const capitalLetters = /[A-Z]/;
        const lowerCaseLetters = /[a-z]/;
        const numbers = /\d/;
        const simbols = /[^a-zA-Z0-9]/;

        // if(password.length >= 10)
            //     {
            //         sum++
            //     }
            
            // if(capitalLetters.test(password))
            //     {
            //         sum++
            //     }

            //  if(lowerCaseLetters.test(password))
            //     {
            //         sum++
            //     }

            // if(numbers.test(password))
            //     {
            //         sum++
            //     }
            
            // if(simbols.test(password))
            //     {
            //         sum++
            //     }
        

        //Pakeiciau savo if else I "?"" kad atrodytu graziau 
        
        sum += password.length >= 10 ? 1 : 0;
        sum += capitalLetters.test(password) ? 1 : 0;
        sum += lowerCaseLetters.test(password) ? 1 : 0;
        sum += numbers.test(password) ? 1 : 0;
        sum += simbols.test(password) ? 1 : 0;

        if(sum <= 2) //Bandziau ir sita su "?"" bet sunkiai skaitesi bent jau man 
            {
                points = " silpnas";
            }
        else if(sum <= 4)
            {
                points = " vidutinis";
            }
        else
            {
                points =" stiprus";
            }
        
        let result = sum + points; 
        let mising = 10 - password.length; // patikrina ar maziau nei 10

        if(password.length < 10) // Jeigu maziau uz 10 simboliu 
            {
                result += ` Truksta simboliu ${mising} zodziui ${password}`; //Nereikejo zodzio kuriam truksta, isvesti, bet graziau atrode kada zinai koks zodis
            }

        return  result
    }      
    

    console.log(checkPassword("Labas2026!"));
    console.log(checkPassword("labas"));


//------3-----
//SITAS TAI BUVO PRAGARAS

const birthayInfo = (birthDate, today) =>
    {
        const oneDay = (1000 * 60 * 60 * 24);
        const yearMilisecons = 1000 * 60 * 60 * 24 * 365.2425; // milisekundziu pavertimas metais
        
        //pilni metai
        const dateOfBirth = new Date(birthDate);
        const dateOfToday = new Date(today);
        
        //mesiai, dienos
        const dateOfBirthMonth = dateOfBirth.getMonth();
        const dateOfBirthDay = dateOfBirth.getDate();
        
        // amziaus skaiciavimas
        let ageCounter = (dateOfToday - dateOfBirth);
        let age = (ageCounter / yearMilisecons);
        
        const nextBirtday = new Date(dateOfToday.getFullYear(), dateOfBirthMonth, dateOfBirthDay); /* pakeiciam gimimo metus I dabartinius
                                                                                                    bet palieku gimimo menesi ir diena
                                                                                                  */
        
        if(nextBirtday < dateOfToday)
            {
                nextBirtday.setFullYear(dateOfToday.getFullYear() + 1); //jeigu gimtadienis praejo skaiciuojam kitiem metam
            }

        let daysTillBirtday = (nextBirtday - dateOfToday);
        let days = (daysTillBirtday / oneDay);

        // Papildomos dienos skaiciuokle
        let isLeapYear = false
        const leapYear = dateOfToday.getFullYear()

        if((leapYear % 4 === 0 && leapYear % 100 !== 0) || (leapYear % 400 === 0)) // radau formole internete. Patikrina ar leap year 
            {
                isLeapYear = true
            }

        if(dateOfBirthMonth === 1 && dateOfBirthDay === 29 && !isLeapYear) // patikrina ar prideti diena ar ne  
            {
                nextBirtday.setMonth(1); // padariau menesi
                nextBirtday.setDate(28); // padariau diena kaip be papildomos
            }
        
        return `Amzius: ${Math.floor(age)} iki gimtadienio liko ${Math.ceil(days)} d. ${isLeapYear}`; //nereikia to isLeapYear bet sau padejau kad suprasciau ar pasikeicia
    }

    console.log(birthayInfo("2003-03-03", new Date("2026-01-03"))); //Naudojau savo data


// -----4-----
const generateOrderCode = (customerName) =>
{
    let capitalLetterName = customerName.toUpperCase().slice(0,4); //didiosios raides ir 4 char
    
    //Datos
    const date = new Date();
    const year = String(date.getFullYear()).slice(2, 4); //Pakeiciau I string kad veiktu slice, padStart
    const month = String(date.getMonth()+ 1).padStart(2, "0"); // + 1 nes getMonth nuo 0 iki 11 ir padStart jeigu MM formatu butu = 0M
    const day = String(date.getDate()).padStart(2, "0"); // nereik +1 nes getDate normaliai skaiciuoja PadStart same reason kaip MM

    //Random numeris
    const randomNumber = String(Math.floor(Math.random() * 10000)).padStart(4,"0"); // 9999 = 9998, 10000 = 9999 cia padStart 4 nes gali but 0001
    
    if(capitalLetterName.length < 4);
        {
            capitalLetterName = capitalLetterName.padEnd(4, "X"); // prideda prie galo kiek truksta raidziu su X
        }

    return `${capitalLetterName}-${year}${month}${day}-${randomNumber}`;
}

console.log(generateOrderCode("Rok"));
console.log(generateOrderCode("Martynas"));

    

    